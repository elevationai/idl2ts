import { IDLVisitor } from '../grammar/IDLVisitor.ts';
import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import * as AST from './nodes.ts';
import {
  SpecificationContext,
  DefinitionContext,
  ModuleContext,
  Interface_declContext,
  Interface_headerContext,
  Interface_bodyContext,
  Export_Context,
  Op_declContext,
  Op_attributeContext,
  Op_type_specContext,
  Parameter_declsContext,
  Param_declContext,
  Param_attributeContext,
  Raises_exprContext,
  Attr_declContext,
  Readonly_attr_specContext,
  Attr_specContext,
  Struct_typeContext,
  MemberContext,
  Union_typeContext,
  Switch_type_specContext,
  Switch_bodyContext,
  Case_stmtContext,
  Case_labelContext,
  Element_specContext,
  Enum_typeContext,
  EnumeratorContext,
  Type_declaratorContext,
  Type_specContext,
  Simple_type_specContext,
  Base_type_specContext,
  Template_type_specContext,
  Sequence_typeContext,
  String_typeContext,
  Wide_string_typeContext,
  Fixed_pt_typeContext,
  Fixed_pt_const_typeContext,
  Const_declContext,
  Const_typeContext,
  Const_expContext,
  Except_declContext,
  DeclaratorsContext,
  DeclaratorContext,
  Simple_declaratorContext,
  Complex_declaratorContext,
  Array_declaratorContext,
  Fixed_array_sizeContext,
  Scoped_nameContext,
  A_scoped_nameContext,
  IdentifierContext
} from '../grammar/IDLParser';

export class ASTBuilder extends AbstractParseTreeVisitor<AST.ASTNode | null> implements IDLVisitor<AST.ASTNode | null> {
  
  protected defaultResult(): AST.ASTNode | null {
    return null;
  }

  visitSpecification(ctx: SpecificationContext): AST.SpecificationNode {
    const definitions: AST.DefinitionNode[] = [];
    
    for (const defCtx of ctx.definition()) {
      const def = this.visitDefinition(defCtx);
      if (def) {
        definitions.push(def as AST.DefinitionNode);
      }
    }
    
    return {
      kind: 'specification',
      definitions
    };
  }

  visitDefinition(ctx: DefinitionContext): AST.DefinitionNode | null {
    if (ctx.type_decl()) {
      const typeDecl = ctx.type_decl()!;
      if (typeDecl.struct_type()) {
        return this.visitStruct_type(typeDecl.struct_type()!);
      } else if (typeDecl.union_type()) {
        return this.visitUnion_type(typeDecl.union_type()!);
      } else if (typeDecl.enum_type()) {
        return this.visitEnum_type(typeDecl.enum_type()!);
      }
    } else if (ctx.const_decl()) {
      return this.visitConst_decl(ctx.const_decl()!);
    } else if (ctx.except_decl()) {
      return this.visitExcept_decl(ctx.except_decl()!);
    } else if (ctx.interface_or_forward_decl()) {
      const ifaceDecl = ctx.interface_or_forward_decl()!;
      if (ifaceDecl.interface_decl()) {
        return this.visitInterface_decl(ifaceDecl.interface_decl()!);
      }
    } else if (ctx.module()) {
      return this.visitModule(ctx.module()!);
    } else if (ctx.type_id_decl() || ctx.type_prefix_decl()) {
      return null;
    }
    
    return null;
  }

  visitModule(ctx: ModuleContext): AST.ModuleNode {
    const name = ctx.identifier().ID().text;
    const definitions: AST.DefinitionNode[] = [];
    
    for (const defCtx of ctx.definition()) {
      const def = this.visitDefinition(defCtx);
      if (def) {
        definitions.push(def as AST.DefinitionNode);
      }
    }
    
    return {
      kind: 'module',
      name,
      definitions,
      location: {
        line: ctx.start.line,
        column: ctx.start.charPositionInLine
      }
    };
  }

  visitInterface_decl(ctx: Interface_declContext): AST.InterfaceNode {
    const header = ctx.interface_header();
    const body = ctx.interface_body();
    
    const name = header.identifier().ID().text;
    const inheritance: string[] = [];
    
    if (header.interface_inheritance_spec()) {
      const inheritSpec = header.interface_inheritance_spec()!;
      for (const scopedName of inheritSpec.a_scoped_name()) {
        inheritance.push(this.getAScopedName(scopedName));
      }
    }
    
    const members: AST.InterfaceMemberNode[] = [];
    
    for (const exportCtx of body.export_()) {
      const member = this.visitExport(exportCtx);
      if (member) {
        members.push(member as AST.InterfaceMemberNode);
      }
    }
    
    return {
      kind: 'interface',
      name,
      inheritance: inheritance.length > 0 ? inheritance : undefined,
      members,
      isAbstract: header.KW_ABSTRACT() !== undefined,
      isLocal: header.KW_LOCAL() !== undefined,
      location: {
        line: ctx.start.line,
        column: ctx.start.charPositionInLine
      }
    };
  }

  visitExport(ctx: Export_Context): AST.InterfaceMemberNode | null {
    if (ctx.type_decl()) {
      const typeDecl = ctx.type_decl()!;
      if (typeDecl.struct_type()) {
        return this.visitStruct_type(typeDecl.struct_type()!);
      } else if (typeDecl.union_type()) {
        return this.visitUnion_type(typeDecl.union_type()!);
      } else if (typeDecl.enum_type()) {
        return this.visitEnum_type(typeDecl.enum_type()!);
      } else if (typeDecl.type_declarator()) {
        return this.visitType_declarator(typeDecl.type_declarator()!);
      }
    } else if (ctx.const_decl()) {
      return this.visitConst_decl(ctx.const_decl()!);
    } else if (ctx.except_decl()) {
      return this.visitExcept_decl(ctx.except_decl()!);
    } else if (ctx.attr_decl()) {
      return this.visitAttr_decl(ctx.attr_decl()!);
    } else if (ctx.op_decl()) {
      return this.visitOp_decl(ctx.op_decl()!);
    }
    
    return null;
  }

  visitOp_decl(ctx: Op_declContext): AST.OperationNode {
    const isOneway = ctx.op_attribute() && ctx.op_attribute()!.KW_ONEWAY() !== undefined;
    const returnType = this.visitOp_type_spec(ctx.op_type_spec());
    const name = ctx.identifier().ID().text;
    const parameters: AST.ParameterNode[] = [];
    
    if (ctx.parameter_decls()) {
      for (const paramCtx of ctx.parameter_decls()!.param_decl()) {
        parameters.push(this.visitParam_decl(paramCtx));
      }
    }
    
    const raises: string[] = [];
    if (ctx.raises_expr()) {
      for (const scopedName of ctx.raises_expr()!.a_scoped_name()) {
        raises.push(this.getAScopedName(scopedName));
      }
    }
    
    return {
      kind: 'operation',
      name,
      returnType,
      parameters,
      raises: raises.length > 0 ? raises : undefined,
      isOneway,
      location: {
        line: ctx.start.line,
        column: ctx.start.charPositionInLine
      }
    };
  }

  visitOp_type_spec(ctx: Op_type_specContext): AST.TypeNode {
    if (ctx.KW_VOID()) {
      return { kind: 'primitiveType', type: 'void' };
    }
    return this.visitType_spec(ctx.type_spec()!);
  }

  visitParam_decl(ctx: Param_declContext): AST.ParameterNode {
    const directionCtx = ctx.param_attribute();
    let direction: 'in' | 'out' | 'inout' = 'in';
    
    if (directionCtx.KW_OUT()) {
      direction = 'out';
    } else if (directionCtx.KW_INOUT()) {
      direction = 'inout';
    }
    
    const type = this.visitType_spec(ctx.type_spec());
    const name = ctx.simple_declarator().ID().text;
    
    return {
      kind: 'parameter',
      name,
      type,
      direction,
      location: {
        line: ctx.start.line,
        column: ctx.start.charPositionInLine
      }
    };
  }

  visitAttr_decl(ctx: Attr_declContext): AST.AttributeNode | AST.AttributeNode[] {
    if (ctx.readonly_attr_spec()) {
      const readonlySpec = ctx.readonly_attr_spec()!;
      const type = this.visitType_spec(readonlySpec.type_spec());
      const declarator = readonlySpec.readonly_attr_declarator();
      const name = declarator.simple_declarator(0).ID().text;
      
      return {
        kind: 'attribute',
        name,
        type,
        isReadonly: true,
        location: {
          line: ctx.start.line,
          column: ctx.start.charPositionInLine
        }
      };
    } else {
      const attrSpec = ctx.attr_spec()!;
      const type = this.visitType_spec(attrSpec.type_spec());
      const declarator = attrSpec.attr_declarator();
      const name = declarator.simple_declarator(0).ID().text;
      
      return {
        kind: 'attribute',
        name,
        type,
        isReadonly: false,
        location: {
          line: ctx.start.line,
          column: ctx.start.charPositionInLine
        }
      };
    }
  }

  visitStruct_type(ctx: Struct_typeContext): AST.StructNode {
    const name = ctx.ID().text;
    const members: AST.MemberNode[] = [];
    
    for (const memberCtx of ctx.member_list().member()) {
      const memberNodes = this.visitMember(memberCtx);
      members.push(...memberNodes);
    }
    
    return {
      kind: 'struct',
      name,
      members,
      location: {
        line: ctx.start.line,
        column: ctx.start.charPositionInLine
      }
    };
  }

  visitMember(ctx: MemberContext): AST.MemberNode[] {
    const type = this.visitType_spec(ctx.type_spec());
    const members: AST.MemberNode[] = [];
    
    for (const declaratorCtx of ctx.declarator_list().declarator()) {
      let name: string;
      if (declaratorCtx.simple_declarator()) {
        name = declaratorCtx.simple_declarator()!.ID().text;
      } else {
        name = declaratorCtx.complex_declarator()!.array_declarator()!.ID().text;
      }
      
      members.push({
        kind: 'member',
        name,
        type,
        location: {
          line: ctx.start.line,
          column: ctx.start.charPositionInLine
        }
      });
    }
    
    return members;
  }

  visitUnion_type(ctx: Union_typeContext): AST.UnionNode {
    const name = ctx.ID().text;
    const discriminatorType = this.visitSwitch_type_spec(ctx.switch_type_spec());
    const cases: AST.UnionCaseNode[] = [];
    
    for (const caseCtx of ctx.switch_body().case_stmt()) {
      cases.push(this.visitCase_stmt(caseCtx));
    }
    
    return {
      kind: 'union',
      name,
      discriminatorType,
      cases,
      location: {
        line: ctx.start.line,
        column: ctx.start.charPositionInLine
      }
    };
  }

  visitSwitch_type_spec(ctx: Switch_type_specContext): AST.TypeNode {
    if (ctx.integer_type()) {
      return this.visitIntegerType(ctx.integer_type()!);
    } else if (ctx.char_type()) {
      return { kind: 'primitiveType', type: 'char' };
    } else if (ctx.boolean_type()) {
      return { kind: 'primitiveType', type: 'boolean' };
    } else if (ctx.enum_type()) {
      const enumType = this.visitEnum_type(ctx.enum_type()!);
      return { kind: 'namedType', name: enumType.name };
    } else if (ctx.scoped_name()) {
      return { kind: 'namedType', name: this.getScopedName(ctx.scoped_name()!) };
    }
    
    return { kind: 'primitiveType', type: 'long' };
  }

  visitCase_stmt(ctx: Case_stmtContext): AST.UnionCaseNode {
    const labels: (string | number | boolean)[] = [];
    let isDefault = false;
    
    for (const labelCtx of ctx.case_label()) {
      if (labelCtx.KW_DEFAULT()) {
        isDefault = true;
      } else {
        const expr = labelCtx.const_exp()!.getText();
        labels.push(expr);
      }
    }
    
    let member: AST.MemberNode | undefined;
    if (ctx.element_spec()) {
      const type = this.visitType_spec(ctx.element_spec()!.type_spec());
      const name = ctx.element_spec()!.declarator().simple_declarator()!.ID().text;
      member = {
        kind: 'member',
        name,
        type
      };
    }
    
    return {
      kind: 'unionCase',
      labels,
      member,
      isDefault
    };
  }

  visitEnum_type(ctx: Enum_typeContext): AST.EnumNode {
    const name = ctx.ID().text;
    const members: string[] = [];
    
    for (const enumCtx of ctx.enumerator()) {
      members.push(enumCtx.ID().text);
    }
    
    return {
      kind: 'enum',
      name,
      members,
      location: {
        line: ctx.start.line,
        column: ctx.start.charPositionInLine
      }
    };
  }

  visitType_declarator(ctx: Type_declaratorContext): AST.TypedefNode {
    const type = this.visitType_spec(ctx.type_spec());
    const declarator = ctx.declarator_list().declarator(0);
    let name: string;
    
    if (declarator.simple_declarator()) {
      name = declarator.simple_declarator()!.ID().text;
    } else {
      name = declarator.complex_declarator()!.array_declarator()!.ID().text;
    }
    
    return {
      kind: 'typedef',
      name,
      type,
      location: {
        line: ctx.start.line,
        column: ctx.start.charPositionInLine
      }
    };
  }

  visitConst_decl(ctx: Const_declContext): AST.ConstantNode {
    const type = this.visitConst_type(ctx.const_type());
    const name = ctx.ID().text;
    const value = this.evaluateConstExpr(ctx.const_exp());
    
    return {
      kind: 'constant',
      name,
      type,
      value,
      location: {
        line: ctx.start.line,
        column: ctx.start.charPositionInLine
      }
    };
  }

  visitConst_type(ctx: Const_typeContext): AST.TypeNode {
    if (ctx.integer_type()) {
      return this.visitIntegerType(ctx.integer_type()!);
    } else if (ctx.char_type()) {
      return { kind: 'primitiveType', type: 'char' };
    } else if (ctx.wide_char_type()) {
      return { kind: 'primitiveType', type: 'wchar' };
    } else if (ctx.boolean_type()) {
      return { kind: 'primitiveType', type: 'boolean' };
    } else if (ctx.floating_pt_type()) {
      return this.visitFloatingPtType(ctx.floating_pt_type()!);
    } else if (ctx.string_type()) {
      return { kind: 'stringType', type: 'string' };
    } else if (ctx.wide_string_type()) {
      return { kind: 'stringType', type: 'wstring' };
    } else if (ctx.fixed_pt_const_type()) {
      return { kind: 'fixedType', totalDigits: 0, fractionalDigits: 0 };
    } else if (ctx.scoped_name()) {
      return { kind: 'namedType', name: this.getScopedName(ctx.scoped_name()!) };
    } else if (ctx.octet_type()) {
      return { kind: 'primitiveType', type: 'octet' };
    }
    
    return { kind: 'primitiveType', type: 'any' };
  }

  visitExcept_decl(ctx: Except_declContext): AST.ExceptionNode {
    const name = ctx.ID().text;
    const members: AST.MemberNode[] = [];
    
    if (ctx.member_list()) {
      for (const memberCtx of ctx.member_list()!.member()) {
        const memberNodes = this.visitMember(memberCtx);
        members.push(...memberNodes);
      }
    }
    
    return {
      kind: 'exception',
      name,
      members,
      location: {
        line: ctx.start.line,
        column: ctx.start.charPositionInLine
      }
    };
  }

  visitType_spec(ctx: Type_specContext): AST.TypeNode {
    if (ctx.simple_type_spec()) {
      return this.visitSimple_type_spec(ctx.simple_type_spec()!);
    } else if (ctx.constr_type_spec()) {
      const constrType = ctx.constr_type_spec()!;
      if (constrType.struct_type()) {
        const struct = this.visitStruct_type(constrType.struct_type()!);
        return { kind: 'namedType', name: struct.name };
      } else if (constrType.union_type()) {
        const union = this.visitUnion_type(constrType.union_type()!);
        return { kind: 'namedType', name: union.name };
      } else if (constrType.enum_type()) {
        const enumType = this.visitEnum_type(constrType.enum_type()!);
        return { kind: 'namedType', name: enumType.name };
      }
    }
    
    return { kind: 'primitiveType', type: 'any' };
  }

  visitSimple_type_spec(ctx: Simple_type_specContext): AST.TypeNode {
    if (ctx.base_type_spec()) {
      return this.visitBase_type_spec(ctx.base_type_spec()!);
    } else if (ctx.template_type_spec()) {
      return this.visitTemplate_type_spec(ctx.template_type_spec()!);
    } else if (ctx.scoped_name()) {
      return { kind: 'namedType', name: this.getScopedName(ctx.scoped_name()!) };
    }
    
    return { kind: 'primitiveType', type: 'any' };
  }

  visitBase_type_spec(ctx: Base_type_specContext): AST.TypeNode {
    if (ctx.floating_pt_type()) {
      return this.visitFloatingPtType(ctx.floating_pt_type()!);
    } else if (ctx.integer_type()) {
      return this.visitIntegerType(ctx.integer_type()!);
    } else if (ctx.char_type()) {
      return { kind: 'primitiveType', type: 'char' };
    } else if (ctx.wide_char_type()) {
      return { kind: 'primitiveType', type: 'wchar' };
    } else if (ctx.boolean_type()) {
      return { kind: 'primitiveType', type: 'boolean' };
    } else if (ctx.octet_type()) {
      return { kind: 'primitiveType', type: 'octet' };
    } else if (ctx.any_type()) {
      return { kind: 'primitiveType', type: 'any' };
    } else if (ctx.object_type()) {
      return { kind: 'primitiveType', type: 'Object' };
    }
    
    return { kind: 'primitiveType', type: 'any' };
  }

  visitTemplate_type_spec(ctx: Template_type_specContext): AST.TypeNode {
    if (ctx.sequence_type()) {
      return this.visitSequence_type(ctx.sequence_type()!);
    } else if (ctx.string_type()) {
      const bound = ctx.string_type()!.positive_int_const();
      return { 
        kind: 'stringType', 
        type: 'string',
        bound: bound ? parseInt(bound.getText()) : undefined
      };
    } else if (ctx.wide_string_type()) {
      const bound = ctx.wide_string_type()!.positive_int_const();
      return { 
        kind: 'stringType', 
        type: 'wstring',
        bound: bound ? parseInt(bound.getText()) : undefined
      };
    } else if (ctx.fixed_pt_type()) {
      return { kind: 'fixedType', totalDigits: 0, fractionalDigits: 0 };
    }
    
    return { kind: 'primitiveType', type: 'any' };
  }

  visitSequence_type(ctx: Sequence_typeContext): AST.SequenceTypeNode {
    const elementType = this.visitType_spec(ctx.type_spec());
    const bound = ctx.positive_int_const();
    
    return {
      kind: 'sequenceType',
      elementType,
      bound: bound ? parseInt(bound.getText()) : undefined
    };
  }

  private visitIntegerType(ctx: any): AST.PrimitiveTypeNode {
    if (ctx.signed_short_int()) {
      return { kind: 'primitiveType', type: 'short' };
    } else if (ctx.signed_long_int()) {
      return { kind: 'primitiveType', type: 'long' };
    } else if (ctx.signed_longlong_int()) {
      return { kind: 'primitiveType', type: 'long long' };
    } else if (ctx.unsigned_short_int()) {
      return { kind: 'primitiveType', type: 'unsigned short' };
    } else if (ctx.unsigned_long_int()) {
      return { kind: 'primitiveType', type: 'unsigned long' };
    } else if (ctx.unsigned_longlong_int()) {
      return { kind: 'primitiveType', type: 'unsigned long long' };
    }
    
    return { kind: 'primitiveType', type: 'long' };
  }

  private visitFloatingPtType(ctx: any): AST.PrimitiveTypeNode {
    if (ctx.KW_FLOAT()) {
      return { kind: 'primitiveType', type: 'float' };
    } else if (ctx.KW_DOUBLE()) {
      return { kind: 'primitiveType', type: 'double' };
    } else if (ctx.KW_LONG() && ctx.KW_DOUBLE()) {
      return { kind: 'primitiveType', type: 'long double' };
    }
    
    return { kind: 'primitiveType', type: 'float' };
  }

  private getScopedName(ctx: Scoped_nameContext): string {
    return ctx.ID().map(id => id.text).join('::');
  }

  private getAScopedName(ctx: A_scoped_nameContext): string {
    const scopedName = ctx.scoped_name();
    return this.getScopedName(scopedName);
  }

  private evaluateConstExpr(ctx: Const_expContext): string | number | boolean {
    const text = ctx.getText();
    
    if (text === 'TRUE' || text === 'true') return true;
    if (text === 'FALSE' || text === 'false') return false;
    
    if (text.match(/^[0-9]+$/)) {
      return parseInt(text);
    }
    
    if (text.match(/^0x[0-9a-fA-F]+$/)) {
      return parseInt(text, 16);
    }
    
    if (text.match(/^[0-9]*\.[0-9]+$/)) {
      return parseFloat(text);
    }
    
    if (text.startsWith('"') && text.endsWith('"')) {
      return text.slice(1, -1);
    }
    
    if (text.startsWith("'") && text.endsWith("'")) {
      return text.slice(1, -1);
    }
    
    return text;
  }
}