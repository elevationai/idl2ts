export type ASTNode =
  | SpecificationNode
  | ModuleNode
  | InterfaceNode
  | StructNode
  | UnionNode
  | EnumNode
  | TypedefNode
  | ConstantNode
  | ExceptionNode
  | OperationNode
  | AttributeNode
  | ParameterNode
  | MemberNode;

export interface BaseNode {
  kind: string;
  location?: {
    line: number;
    column: number;
  };
}

export interface SpecificationNode extends BaseNode {
  kind: 'specification';
  definitions: DefinitionNode[];
  pragmas?: Map<string, string>; // Global pragmas like prefix
}

export type DefinitionNode =
  | ModuleNode
  | InterfaceNode
  | StructNode
  | UnionNode
  | EnumNode
  | TypedefNode
  | ConstantNode
  | ExceptionNode;

export interface ModuleNode extends BaseNode {
  kind: 'module';
  name: string;
  definitions: DefinitionNode[];
}

export interface InterfaceNode extends BaseNode {
  kind: 'interface';
  name: string;
  isAbstract?: boolean;
  isLocal?: boolean;
  inheritance?: string[];
  members: InterfaceMemberNode[];
}

export type InterfaceMemberNode =
  | OperationNode
  | AttributeNode
  | ConstantNode
  | TypedefNode
  | StructNode
  | UnionNode
  | EnumNode
  | ExceptionNode;

export interface OperationNode extends BaseNode {
  kind: 'operation';
  name: string;
  returnType: TypeNode;
  parameters: ParameterNode[];
  raises?: string[];
  isOneway?: boolean;
}

export interface ParameterNode extends BaseNode {
  kind: 'parameter';
  name: string;
  type: TypeNode;
  direction: 'in' | 'out' | 'inout';
}

export interface AttributeNode extends BaseNode {
  kind: 'attribute';
  name: string;
  type: TypeNode;
  isReadonly?: boolean;
}

export interface StructNode extends BaseNode {
  kind: 'struct';
  name: string;
  members: MemberNode[];
}

export interface MemberNode extends BaseNode {
  kind: 'member';
  name: string;
  type: TypeNode;
}

export interface UnionNode extends BaseNode {
  kind: 'union';
  name: string;
  discriminatorType: TypeNode;
  cases: UnionCaseNode[];
}

export interface UnionCaseNode extends BaseNode {
  kind: 'unionCase';
  labels: (string | number | boolean)[];
  member?: MemberNode;
  isDefault?: boolean;
}

export interface EnumNode extends BaseNode {
  kind: 'enum';
  name: string;
  members: string[];
}

export interface TypedefNode extends BaseNode {
  kind: 'typedef';
  name: string;
  type: TypeNode;
}

export interface ConstantNode extends BaseNode {
  kind: 'constant';
  name: string;
  type: TypeNode;
  value: string | number | boolean;
}

export interface ExceptionNode extends BaseNode {
  kind: 'exception';
  name: string;
  members: MemberNode[];
}

export type TypeNode =
  | PrimitiveTypeNode
  | NamedTypeNode
  | SequenceTypeNode
  | ArrayTypeNode
  | StringTypeNode
  | FixedTypeNode;

export interface PrimitiveTypeNode extends BaseNode {
  kind: 'primitiveType';
  type:
    | 'void'
    | 'boolean'
    | 'char'
    | 'wchar'
    | 'octet'
    | 'short'
    | 'unsigned short'
    | 'long'
    | 'unsigned long'
    | 'long long'
    | 'unsigned long long'
    | 'float'
    | 'double'
    | 'long double'
    | 'any'
    | 'Object';
}

export interface NamedTypeNode extends BaseNode {
  kind: 'namedType';
  name: string;
  scopedName?: string[];
}

export interface SequenceTypeNode extends BaseNode {
  kind: 'sequenceType';
  elementType: TypeNode;
  bound?: number;
}

export interface ArrayTypeNode extends BaseNode {
  kind: 'arrayType';
  elementType: TypeNode;
  dimensions: number[];
}

export interface StringTypeNode extends BaseNode {
  kind: 'stringType';
  type: 'string' | 'wstring';
  bound?: number;
}

export interface FixedTypeNode extends BaseNode {
  kind: 'fixedType';
  totalDigits: number;
  fractionalDigits: number;
}
