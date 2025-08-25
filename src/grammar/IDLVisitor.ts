// Generated from src/grammar/IDL.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";

import { SpecificationContext } from "./IDLParser";
import { DefinitionContext } from "./IDLParser";
import { ModuleContext } from "./IDLParser";
import { Interface_or_forward_declContext } from "./IDLParser";
import { Interface_declContext } from "./IDLParser";
import { Forward_declContext } from "./IDLParser";
import { Interface_headerContext } from "./IDLParser";
import { Interface_bodyContext } from "./IDLParser";
import { Export_Context } from "./IDLParser";
import { Interface_inheritance_specContext } from "./IDLParser";
import { Interface_nameContext } from "./IDLParser";
import { A_scoped_nameContext } from "./IDLParser";
import { Scoped_nameContext } from "./IDLParser";
import { ValueContext } from "./IDLParser";
import { Value_forward_declContext } from "./IDLParser";
import { Value_box_declContext } from "./IDLParser";
import { Value_abs_declContext } from "./IDLParser";
import { Value_declContext } from "./IDLParser";
import { Value_headerContext } from "./IDLParser";
import { Value_inheritance_specContext } from "./IDLParser";
import { Value_nameContext } from "./IDLParser";
import { Value_elementContext } from "./IDLParser";
import { State_memberContext } from "./IDLParser";
import { Init_declContext } from "./IDLParser";
import { Init_param_declsContext } from "./IDLParser";
import { Init_param_declContext } from "./IDLParser";
import { Init_param_attributeContext } from "./IDLParser";
import { Const_declContext } from "./IDLParser";
import { Const_typeContext } from "./IDLParser";
import { Const_expContext } from "./IDLParser";
import { Or_exprContext } from "./IDLParser";
import { Xor_exprContext } from "./IDLParser";
import { And_exprContext } from "./IDLParser";
import { Shift_exprContext } from "./IDLParser";
import { Add_exprContext } from "./IDLParser";
import { Mult_exprContext } from "./IDLParser";
import { Unary_exprContext } from "./IDLParser";
import { Unary_operatorContext } from "./IDLParser";
import { Primary_exprContext } from "./IDLParser";
import { LiteralContext } from "./IDLParser";
import { Positive_int_constContext } from "./IDLParser";
import { Type_declContext } from "./IDLParser";
import { Type_declaratorContext } from "./IDLParser";
import { Type_specContext } from "./IDLParser";
import { Simple_type_specContext } from "./IDLParser";
import { Bitfield_type_specContext } from "./IDLParser";
import { Base_type_specContext } from "./IDLParser";
import { Template_type_specContext } from "./IDLParser";
import { Constr_type_specContext } from "./IDLParser";
import { Simple_declaratorsContext } from "./IDLParser";
import { DeclaratorsContext } from "./IDLParser";
import { DeclaratorContext } from "./IDLParser";
import { Simple_declaratorContext } from "./IDLParser";
import { Complex_declaratorContext } from "./IDLParser";
import { Floating_pt_typeContext } from "./IDLParser";
import { Integer_typeContext } from "./IDLParser";
import { Signed_intContext } from "./IDLParser";
import { Signed_tiny_intContext } from "./IDLParser";
import { Signed_short_intContext } from "./IDLParser";
import { Signed_long_intContext } from "./IDLParser";
import { Signed_longlong_intContext } from "./IDLParser";
import { Unsigned_intContext } from "./IDLParser";
import { Unsigned_tiny_intContext } from "./IDLParser";
import { Unsigned_short_intContext } from "./IDLParser";
import { Unsigned_long_intContext } from "./IDLParser";
import { Unsigned_longlong_intContext } from "./IDLParser";
import { Char_typeContext } from "./IDLParser";
import { Wide_char_typeContext } from "./IDLParser";
import { Boolean_typeContext } from "./IDLParser";
import { Octet_typeContext } from "./IDLParser";
import { Any_typeContext } from "./IDLParser";
import { Object_typeContext } from "./IDLParser";
import { Annotation_declContext } from "./IDLParser";
import { Annotation_defContext } from "./IDLParser";
import { Annotation_headerContext } from "./IDLParser";
import { Annotation_inheritance_specContext } from "./IDLParser";
import { Annotation_bodyContext } from "./IDLParser";
import { Annotation_memberContext } from "./IDLParser";
import { Annotation_forward_dclContext } from "./IDLParser";
import { Bitset_typeContext } from "./IDLParser";
import { BitfieldContext } from "./IDLParser";
import { Bitfield_specContext } from "./IDLParser";
import { Bitmask_typeContext } from "./IDLParser";
import { Bit_valuesContext } from "./IDLParser";
import { Struct_typeContext } from "./IDLParser";
import { Member_listContext } from "./IDLParser";
import { MemberContext } from "./IDLParser";
import { Union_typeContext } from "./IDLParser";
import { Switch_type_specContext } from "./IDLParser";
import { Switch_bodyContext } from "./IDLParser";
import { Case_stmtContext } from "./IDLParser";
import { Case_labelContext } from "./IDLParser";
import { Element_specContext } from "./IDLParser";
import { Enum_typeContext } from "./IDLParser";
import { EnumeratorContext } from "./IDLParser";
import { Sequence_typeContext } from "./IDLParser";
import { Set_typeContext } from "./IDLParser";
import { Map_typeContext } from "./IDLParser";
import { String_typeContext } from "./IDLParser";
import { Wide_string_typeContext } from "./IDLParser";
import { Array_declaratorContext } from "./IDLParser";
import { Fixed_array_sizeContext } from "./IDLParser";
import { Attr_declContext } from "./IDLParser";
import { Except_declContext } from "./IDLParser";
import { Op_declContext } from "./IDLParser";
import { Op_attributeContext } from "./IDLParser";
import { Op_type_specContext } from "./IDLParser";
import { Parameter_declsContext } from "./IDLParser";
import { Param_declContext } from "./IDLParser";
import { Param_attributeContext } from "./IDLParser";
import { Raises_exprContext } from "./IDLParser";
import { Context_exprContext } from "./IDLParser";
import { Param_type_specContext } from "./IDLParser";
import { Fixed_pt_typeContext } from "./IDLParser";
import { Fixed_pt_const_typeContext } from "./IDLParser";
import { Value_base_typeContext } from "./IDLParser";
import { Constr_forward_declContext } from "./IDLParser";
import { Import_declContext } from "./IDLParser";
import { Imported_scopeContext } from "./IDLParser";
import { Type_id_declContext } from "./IDLParser";
import { Type_prefix_declContext } from "./IDLParser";
import { Readonly_attr_specContext } from "./IDLParser";
import { Readonly_attr_declaratorContext } from "./IDLParser";
import { Attr_specContext } from "./IDLParser";
import { Attr_declaratorContext } from "./IDLParser";
import { Attr_raises_exprContext } from "./IDLParser";
import { Get_excep_exprContext } from "./IDLParser";
import { Set_excep_exprContext } from "./IDLParser";
import { Exception_listContext } from "./IDLParser";
import { ComponentContext } from "./IDLParser";
import { Component_forward_declContext } from "./IDLParser";
import { Component_declContext } from "./IDLParser";
import { Component_headerContext } from "./IDLParser";
import { Supported_interface_specContext } from "./IDLParser";
import { Component_inheritance_specContext } from "./IDLParser";
import { Component_bodyContext } from "./IDLParser";
import { Component_exportContext } from "./IDLParser";
import { Provides_declContext } from "./IDLParser";
import { Interface_typeContext } from "./IDLParser";
import { Uses_declContext } from "./IDLParser";
import { Emits_declContext } from "./IDLParser";
import { Publishes_declContext } from "./IDLParser";
import { Consumes_declContext } from "./IDLParser";
import { Home_declContext } from "./IDLParser";
import { Home_headerContext } from "./IDLParser";
import { Home_inheritance_specContext } from "./IDLParser";
import { Primary_key_specContext } from "./IDLParser";
import { Home_bodyContext } from "./IDLParser";
import { Home_exportContext } from "./IDLParser";
import { Factory_declContext } from "./IDLParser";
import { Finder_declContext } from "./IDLParser";
import { EventContext } from "./IDLParser";
import { Event_forward_declContext } from "./IDLParser";
import { Event_abs_declContext } from "./IDLParser";
import { Event_declContext } from "./IDLParser";
import { Event_headerContext } from "./IDLParser";
import { AnnappsContext } from "./IDLParser";
import { Annotation_applContext } from "./IDLParser";
import { Annotation_appl_paramsContext } from "./IDLParser";
import { Annotation_appl_paramContext } from "./IDLParser";
import { IdentifierContext } from "./IDLParser";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `IDLParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export interface IDLVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by `IDLParser.specification`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSpecification?: (ctx: SpecificationContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.definition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDefinition?: (ctx: DefinitionContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.module`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitModule?: (ctx: ModuleContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.interface_or_forward_decl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInterface_or_forward_decl?: (ctx: Interface_or_forward_declContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.interface_decl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInterface_decl?: (ctx: Interface_declContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.forward_decl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitForward_decl?: (ctx: Forward_declContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.interface_header`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInterface_header?: (ctx: Interface_headerContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.interface_body`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInterface_body?: (ctx: Interface_bodyContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.export_`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExport_?: (ctx: Export_Context) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.interface_inheritance_spec`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInterface_inheritance_spec?: (ctx: Interface_inheritance_specContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.interface_name`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInterface_name?: (ctx: Interface_nameContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.a_scoped_name`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitA_scoped_name?: (ctx: A_scoped_nameContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.scoped_name`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitScoped_name?: (ctx: Scoped_nameContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.value`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitValue?: (ctx: ValueContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.value_forward_decl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitValue_forward_decl?: (ctx: Value_forward_declContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.value_box_decl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitValue_box_decl?: (ctx: Value_box_declContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.value_abs_decl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitValue_abs_decl?: (ctx: Value_abs_declContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.value_decl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitValue_decl?: (ctx: Value_declContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.value_header`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitValue_header?: (ctx: Value_headerContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.value_inheritance_spec`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitValue_inheritance_spec?: (ctx: Value_inheritance_specContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.value_name`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitValue_name?: (ctx: Value_nameContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.value_element`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitValue_element?: (ctx: Value_elementContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.state_member`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitState_member?: (ctx: State_memberContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.init_decl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInit_decl?: (ctx: Init_declContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.init_param_decls`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInit_param_decls?: (ctx: Init_param_declsContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.init_param_decl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInit_param_decl?: (ctx: Init_param_declContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.init_param_attribute`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInit_param_attribute?: (ctx: Init_param_attributeContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.const_decl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConst_decl?: (ctx: Const_declContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.const_type`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConst_type?: (ctx: Const_typeContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.const_exp`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConst_exp?: (ctx: Const_expContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.or_expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOr_expr?: (ctx: Or_exprContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.xor_expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitXor_expr?: (ctx: Xor_exprContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.and_expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAnd_expr?: (ctx: And_exprContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.shift_expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitShift_expr?: (ctx: Shift_exprContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.add_expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAdd_expr?: (ctx: Add_exprContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.mult_expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMult_expr?: (ctx: Mult_exprContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.unary_expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnary_expr?: (ctx: Unary_exprContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.unary_operator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnary_operator?: (ctx: Unary_operatorContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.primary_expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrimary_expr?: (ctx: Primary_exprContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLiteral?: (ctx: LiteralContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.positive_int_const`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPositive_int_const?: (ctx: Positive_int_constContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.type_decl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitType_decl?: (ctx: Type_declContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.type_declarator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitType_declarator?: (ctx: Type_declaratorContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.type_spec`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitType_spec?: (ctx: Type_specContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.simple_type_spec`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSimple_type_spec?: (ctx: Simple_type_specContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.bitfield_type_spec`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBitfield_type_spec?: (ctx: Bitfield_type_specContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.base_type_spec`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBase_type_spec?: (ctx: Base_type_specContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.template_type_spec`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTemplate_type_spec?: (ctx: Template_type_specContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.constr_type_spec`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConstr_type_spec?: (ctx: Constr_type_specContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.simple_declarators`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSimple_declarators?: (ctx: Simple_declaratorsContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.declarators`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDeclarators?: (ctx: DeclaratorsContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.declarator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDeclarator?: (ctx: DeclaratorContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.simple_declarator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSimple_declarator?: (ctx: Simple_declaratorContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.complex_declarator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComplex_declarator?: (ctx: Complex_declaratorContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.floating_pt_type`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFloating_pt_type?: (ctx: Floating_pt_typeContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.integer_type`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInteger_type?: (ctx: Integer_typeContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.signed_int`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSigned_int?: (ctx: Signed_intContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.signed_tiny_int`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSigned_tiny_int?: (ctx: Signed_tiny_intContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.signed_short_int`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSigned_short_int?: (ctx: Signed_short_intContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.signed_long_int`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSigned_long_int?: (ctx: Signed_long_intContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.signed_longlong_int`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSigned_longlong_int?: (ctx: Signed_longlong_intContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.unsigned_int`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnsigned_int?: (ctx: Unsigned_intContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.unsigned_tiny_int`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnsigned_tiny_int?: (ctx: Unsigned_tiny_intContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.unsigned_short_int`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnsigned_short_int?: (ctx: Unsigned_short_intContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.unsigned_long_int`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnsigned_long_int?: (ctx: Unsigned_long_intContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.unsigned_longlong_int`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnsigned_longlong_int?: (ctx: Unsigned_longlong_intContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.char_type`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitChar_type?: (ctx: Char_typeContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.wide_char_type`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWide_char_type?: (ctx: Wide_char_typeContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.boolean_type`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBoolean_type?: (ctx: Boolean_typeContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.octet_type`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOctet_type?: (ctx: Octet_typeContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.any_type`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAny_type?: (ctx: Any_typeContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.object_type`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitObject_type?: (ctx: Object_typeContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.annotation_decl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAnnotation_decl?: (ctx: Annotation_declContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.annotation_def`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAnnotation_def?: (ctx: Annotation_defContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.annotation_header`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAnnotation_header?: (ctx: Annotation_headerContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.annotation_inheritance_spec`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAnnotation_inheritance_spec?: (ctx: Annotation_inheritance_specContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.annotation_body`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAnnotation_body?: (ctx: Annotation_bodyContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.annotation_member`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAnnotation_member?: (ctx: Annotation_memberContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.annotation_forward_dcl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAnnotation_forward_dcl?: (ctx: Annotation_forward_dclContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.bitset_type`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBitset_type?: (ctx: Bitset_typeContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.bitfield`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBitfield?: (ctx: BitfieldContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.bitfield_spec`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBitfield_spec?: (ctx: Bitfield_specContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.bitmask_type`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBitmask_type?: (ctx: Bitmask_typeContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.bit_values`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBit_values?: (ctx: Bit_valuesContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.struct_type`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStruct_type?: (ctx: Struct_typeContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.member_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMember_list?: (ctx: Member_listContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.member`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMember?: (ctx: MemberContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.union_type`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnion_type?: (ctx: Union_typeContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.switch_type_spec`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSwitch_type_spec?: (ctx: Switch_type_specContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.switch_body`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSwitch_body?: (ctx: Switch_bodyContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.case_stmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCase_stmt?: (ctx: Case_stmtContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.case_label`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCase_label?: (ctx: Case_labelContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.element_spec`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitElement_spec?: (ctx: Element_specContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.enum_type`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEnum_type?: (ctx: Enum_typeContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.enumerator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEnumerator?: (ctx: EnumeratorContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.sequence_type`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSequence_type?: (ctx: Sequence_typeContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.set_type`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSet_type?: (ctx: Set_typeContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.map_type`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMap_type?: (ctx: Map_typeContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.string_type`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitString_type?: (ctx: String_typeContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.wide_string_type`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWide_string_type?: (ctx: Wide_string_typeContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.array_declarator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArray_declarator?: (ctx: Array_declaratorContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.fixed_array_size`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFixed_array_size?: (ctx: Fixed_array_sizeContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.attr_decl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAttr_decl?: (ctx: Attr_declContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.except_decl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExcept_decl?: (ctx: Except_declContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.op_decl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOp_decl?: (ctx: Op_declContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.op_attribute`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOp_attribute?: (ctx: Op_attributeContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.op_type_spec`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOp_type_spec?: (ctx: Op_type_specContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.parameter_decls`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParameter_decls?: (ctx: Parameter_declsContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.param_decl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParam_decl?: (ctx: Param_declContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.param_attribute`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParam_attribute?: (ctx: Param_attributeContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.raises_expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRaises_expr?: (ctx: Raises_exprContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.context_expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitContext_expr?: (ctx: Context_exprContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.param_type_spec`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParam_type_spec?: (ctx: Param_type_specContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.fixed_pt_type`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFixed_pt_type?: (ctx: Fixed_pt_typeContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.fixed_pt_const_type`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFixed_pt_const_type?: (ctx: Fixed_pt_const_typeContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.value_base_type`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitValue_base_type?: (ctx: Value_base_typeContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.constr_forward_decl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConstr_forward_decl?: (ctx: Constr_forward_declContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.import_decl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitImport_decl?: (ctx: Import_declContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.imported_scope`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitImported_scope?: (ctx: Imported_scopeContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.type_id_decl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitType_id_decl?: (ctx: Type_id_declContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.type_prefix_decl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitType_prefix_decl?: (ctx: Type_prefix_declContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.readonly_attr_spec`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitReadonly_attr_spec?: (ctx: Readonly_attr_specContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.readonly_attr_declarator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitReadonly_attr_declarator?: (ctx: Readonly_attr_declaratorContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.attr_spec`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAttr_spec?: (ctx: Attr_specContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.attr_declarator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAttr_declarator?: (ctx: Attr_declaratorContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.attr_raises_expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAttr_raises_expr?: (ctx: Attr_raises_exprContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.get_excep_expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGet_excep_expr?: (ctx: Get_excep_exprContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.set_excep_expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSet_excep_expr?: (ctx: Set_excep_exprContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.exception_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitException_list?: (ctx: Exception_listContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.component`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComponent?: (ctx: ComponentContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.component_forward_decl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComponent_forward_decl?: (ctx: Component_forward_declContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.component_decl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComponent_decl?: (ctx: Component_declContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.component_header`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComponent_header?: (ctx: Component_headerContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.supported_interface_spec`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSupported_interface_spec?: (ctx: Supported_interface_specContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.component_inheritance_spec`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComponent_inheritance_spec?: (ctx: Component_inheritance_specContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.component_body`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComponent_body?: (ctx: Component_bodyContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.component_export`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComponent_export?: (ctx: Component_exportContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.provides_decl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProvides_decl?: (ctx: Provides_declContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.interface_type`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInterface_type?: (ctx: Interface_typeContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.uses_decl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUses_decl?: (ctx: Uses_declContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.emits_decl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEmits_decl?: (ctx: Emits_declContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.publishes_decl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPublishes_decl?: (ctx: Publishes_declContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.consumes_decl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConsumes_decl?: (ctx: Consumes_declContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.home_decl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitHome_decl?: (ctx: Home_declContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.home_header`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitHome_header?: (ctx: Home_headerContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.home_inheritance_spec`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitHome_inheritance_spec?: (ctx: Home_inheritance_specContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.primary_key_spec`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrimary_key_spec?: (ctx: Primary_key_specContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.home_body`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitHome_body?: (ctx: Home_bodyContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.home_export`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitHome_export?: (ctx: Home_exportContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.factory_decl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFactory_decl?: (ctx: Factory_declContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.finder_decl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFinder_decl?: (ctx: Finder_declContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.event`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEvent?: (ctx: EventContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.event_forward_decl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEvent_forward_decl?: (ctx: Event_forward_declContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.event_abs_decl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEvent_abs_decl?: (ctx: Event_abs_declContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.event_decl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEvent_decl?: (ctx: Event_declContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.event_header`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEvent_header?: (ctx: Event_headerContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.annapps`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAnnapps?: (ctx: AnnappsContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.annotation_appl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAnnotation_appl?: (ctx: Annotation_applContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.annotation_appl_params`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAnnotation_appl_params?: (ctx: Annotation_appl_paramsContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.annotation_appl_param`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAnnotation_appl_param?: (ctx: Annotation_appl_paramContext) => Result;

	/**
	 * Visit a parse tree produced by `IDLParser.identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIdentifier?: (ctx: IdentifierContext) => Result;
}

