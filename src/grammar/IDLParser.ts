// Generated from src/grammar/IDL.g4 by ANTLR 4.9.0-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { FailedPredicateException } from "antlr4ts/FailedPredicateException";
import { NotNull } from "antlr4ts/Decorators";
import { NoViableAltException } from "antlr4ts/NoViableAltException";
import { Override } from "antlr4ts/Decorators";
import { Parser } from "antlr4ts/Parser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { ParserATNSimulator } from "antlr4ts/atn/ParserATNSimulator";
import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";
import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";
import { RecognitionException } from "antlr4ts/RecognitionException";
import { RuleContext } from "antlr4ts/RuleContext";
//import { RuleVersion } from "antlr4ts/RuleVersion";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Token } from "antlr4ts/Token";
import { TokenStream } from "antlr4ts/TokenStream";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";

import { IDLVisitor } from "./IDLVisitor";


export class IDLParser extends Parser {
	public static readonly INTEGER_LITERAL = 1;
	public static readonly OCTAL_LITERAL = 2;
	public static readonly HEX_LITERAL = 3;
	public static readonly FLOATING_PT_LITERAL = 4;
	public static readonly FIXED_PT_LITERAL = 5;
	public static readonly WIDE_CHARACTER_LITERAL = 6;
	public static readonly CHARACTER_LITERAL = 7;
	public static readonly WIDE_STRING_LITERAL = 8;
	public static readonly STRING_LITERAL = 9;
	public static readonly BOOLEAN_LITERAL = 10;
	public static readonly SEMICOLON = 11;
	public static readonly COLON = 12;
	public static readonly COMMA = 13;
	public static readonly LEFT_BRACE = 14;
	public static readonly RIGHT_BRACE = 15;
	public static readonly LEFT_BRACKET = 16;
	public static readonly RIGHT_BRACKET = 17;
	public static readonly LEFT_SQUARE_BRACKET = 18;
	public static readonly RIGHT_SQUARE_BRACKET = 19;
	public static readonly TILDE = 20;
	public static readonly SLASH = 21;
	public static readonly LEFT_ANG_BRACKET = 22;
	public static readonly RIGHT_ANG_BRACKET = 23;
	public static readonly STAR = 24;
	public static readonly PLUS = 25;
	public static readonly MINUS = 26;
	public static readonly CARET = 27;
	public static readonly AMPERSAND = 28;
	public static readonly PIPE = 29;
	public static readonly EQUAL = 30;
	public static readonly PERCENT = 31;
	public static readonly DOUBLE_COLON = 32;
	public static readonly RIGHT_SHIFT = 33;
	public static readonly LEFT_SHIFT = 34;
	public static readonly AT = 35;
	public static readonly KW_SETRAISES = 36;
	public static readonly KW_OUT = 37;
	public static readonly KW_EMITS = 38;
	public static readonly KW_STRING = 39;
	public static readonly KW_SWITCH = 40;
	public static readonly KW_PUBLISHES = 41;
	public static readonly KW_TYPEDEF = 42;
	public static readonly KW_USES = 43;
	public static readonly KW_PRIMARYKEY = 44;
	public static readonly KW_CUSTOM = 45;
	public static readonly KW_OCTET = 46;
	public static readonly KW_SEQUENCE = 47;
	public static readonly KW_IMPORT = 48;
	public static readonly KW_STRUCT = 49;
	public static readonly KW_NATIVE = 50;
	public static readonly KW_READONLY = 51;
	public static readonly KW_FINDER = 52;
	public static readonly KW_RAISES = 53;
	public static readonly KW_VOID = 54;
	public static readonly KW_PRIVATE = 55;
	public static readonly KW_EVENTTYPE = 56;
	public static readonly KW_WCHAR = 57;
	public static readonly KW_IN = 58;
	public static readonly KW_DEFAULT = 59;
	public static readonly KW_PUBLIC = 60;
	public static readonly KW_SHORT = 61;
	public static readonly KW_LONG = 62;
	public static readonly KW_ENUM = 63;
	public static readonly KW_WSTRING = 64;
	public static readonly KW_CONTEXT = 65;
	public static readonly KW_HOME = 66;
	public static readonly KW_FACTORY = 67;
	public static readonly KW_EXCEPTION = 68;
	public static readonly KW_GETRAISES = 69;
	public static readonly KW_CONST = 70;
	public static readonly KW_VALUEBASE = 71;
	public static readonly KW_VALUETYPE = 72;
	public static readonly KW_SUPPORTS = 73;
	public static readonly KW_MODULE = 74;
	public static readonly KW_OBJECT = 75;
	public static readonly KW_TRUNCATABLE = 76;
	public static readonly KW_UNSIGNED = 77;
	public static readonly KW_FIXED = 78;
	public static readonly KW_UNION = 79;
	public static readonly KW_ONEWAY = 80;
	public static readonly KW_ANY = 81;
	public static readonly KW_CHAR = 82;
	public static readonly KW_CASE = 83;
	public static readonly KW_FLOAT = 84;
	public static readonly KW_BOOLEAN = 85;
	public static readonly KW_MULTIPLE = 86;
	public static readonly KW_ABSTRACT = 87;
	public static readonly KW_INOUT = 88;
	public static readonly KW_PROVIDES = 89;
	public static readonly KW_CONSUMES = 90;
	public static readonly KW_DOUBLE = 91;
	public static readonly KW_TYPEPREFIX = 92;
	public static readonly KW_TYPEID = 93;
	public static readonly KW_ATTRIBUTE = 94;
	public static readonly KW_LOCAL = 95;
	public static readonly KW_MANAGES = 96;
	public static readonly KW_INTERFACE = 97;
	public static readonly KW_COMPONENT = 98;
	public static readonly KW_SET = 99;
	public static readonly KW_MAP = 100;
	public static readonly KW_BITFIELD = 101;
	public static readonly KW_BITSET = 102;
	public static readonly KW_BITMASK = 103;
	public static readonly KW_INT8 = 104;
	public static readonly KW_UINT8 = 105;
	public static readonly KW_INT16 = 106;
	public static readonly KW_UINT16 = 107;
	public static readonly KW_INT32 = 108;
	public static readonly KW_UINT32 = 109;
	public static readonly KW_INT64 = 110;
	public static readonly KW_UINT64 = 111;
	public static readonly KW_AT_ANNOTATION = 112;
	public static readonly ID = 113;
	public static readonly WS = 114;
	public static readonly COMMENT = 115;
	public static readonly LINE_COMMENT = 116;
	public static readonly RULE_specification = 0;
	public static readonly RULE_definition = 1;
	public static readonly RULE_module = 2;
	public static readonly RULE_interface_or_forward_decl = 3;
	public static readonly RULE_interface_decl = 4;
	public static readonly RULE_forward_decl = 5;
	public static readonly RULE_interface_header = 6;
	public static readonly RULE_interface_body = 7;
	public static readonly RULE_export_ = 8;
	public static readonly RULE_interface_inheritance_spec = 9;
	public static readonly RULE_interface_name = 10;
	public static readonly RULE_a_scoped_name = 11;
	public static readonly RULE_scoped_name = 12;
	public static readonly RULE_value = 13;
	public static readonly RULE_value_forward_decl = 14;
	public static readonly RULE_value_box_decl = 15;
	public static readonly RULE_value_abs_decl = 16;
	public static readonly RULE_value_decl = 17;
	public static readonly RULE_value_header = 18;
	public static readonly RULE_value_inheritance_spec = 19;
	public static readonly RULE_value_name = 20;
	public static readonly RULE_value_element = 21;
	public static readonly RULE_state_member = 22;
	public static readonly RULE_init_decl = 23;
	public static readonly RULE_init_param_decls = 24;
	public static readonly RULE_init_param_decl = 25;
	public static readonly RULE_init_param_attribute = 26;
	public static readonly RULE_const_decl = 27;
	public static readonly RULE_const_type = 28;
	public static readonly RULE_const_exp = 29;
	public static readonly RULE_or_expr = 30;
	public static readonly RULE_xor_expr = 31;
	public static readonly RULE_and_expr = 32;
	public static readonly RULE_shift_expr = 33;
	public static readonly RULE_add_expr = 34;
	public static readonly RULE_mult_expr = 35;
	public static readonly RULE_unary_expr = 36;
	public static readonly RULE_unary_operator = 37;
	public static readonly RULE_primary_expr = 38;
	public static readonly RULE_literal = 39;
	public static readonly RULE_positive_int_const = 40;
	public static readonly RULE_type_decl = 41;
	public static readonly RULE_type_declarator = 42;
	public static readonly RULE_type_spec = 43;
	public static readonly RULE_simple_type_spec = 44;
	public static readonly RULE_bitfield_type_spec = 45;
	public static readonly RULE_base_type_spec = 46;
	public static readonly RULE_template_type_spec = 47;
	public static readonly RULE_constr_type_spec = 48;
	public static readonly RULE_simple_declarators = 49;
	public static readonly RULE_declarators = 50;
	public static readonly RULE_declarator = 51;
	public static readonly RULE_simple_declarator = 52;
	public static readonly RULE_complex_declarator = 53;
	public static readonly RULE_floating_pt_type = 54;
	public static readonly RULE_integer_type = 55;
	public static readonly RULE_signed_int = 56;
	public static readonly RULE_signed_tiny_int = 57;
	public static readonly RULE_signed_short_int = 58;
	public static readonly RULE_signed_long_int = 59;
	public static readonly RULE_signed_longlong_int = 60;
	public static readonly RULE_unsigned_int = 61;
	public static readonly RULE_unsigned_tiny_int = 62;
	public static readonly RULE_unsigned_short_int = 63;
	public static readonly RULE_unsigned_long_int = 64;
	public static readonly RULE_unsigned_longlong_int = 65;
	public static readonly RULE_char_type = 66;
	public static readonly RULE_wide_char_type = 67;
	public static readonly RULE_boolean_type = 68;
	public static readonly RULE_octet_type = 69;
	public static readonly RULE_any_type = 70;
	public static readonly RULE_object_type = 71;
	public static readonly RULE_annotation_decl = 72;
	public static readonly RULE_annotation_def = 73;
	public static readonly RULE_annotation_header = 74;
	public static readonly RULE_annotation_inheritance_spec = 75;
	public static readonly RULE_annotation_body = 76;
	public static readonly RULE_annotation_member = 77;
	public static readonly RULE_annotation_forward_dcl = 78;
	public static readonly RULE_bitset_type = 79;
	public static readonly RULE_bitfield = 80;
	public static readonly RULE_bitfield_spec = 81;
	public static readonly RULE_bitmask_type = 82;
	public static readonly RULE_bit_values = 83;
	public static readonly RULE_struct_type = 84;
	public static readonly RULE_member_list = 85;
	public static readonly RULE_member = 86;
	public static readonly RULE_union_type = 87;
	public static readonly RULE_switch_type_spec = 88;
	public static readonly RULE_switch_body = 89;
	public static readonly RULE_case_stmt = 90;
	public static readonly RULE_case_label = 91;
	public static readonly RULE_element_spec = 92;
	public static readonly RULE_enum_type = 93;
	public static readonly RULE_enumerator = 94;
	public static readonly RULE_sequence_type = 95;
	public static readonly RULE_set_type = 96;
	public static readonly RULE_map_type = 97;
	public static readonly RULE_string_type = 98;
	public static readonly RULE_wide_string_type = 99;
	public static readonly RULE_array_declarator = 100;
	public static readonly RULE_fixed_array_size = 101;
	public static readonly RULE_attr_decl = 102;
	public static readonly RULE_except_decl = 103;
	public static readonly RULE_op_decl = 104;
	public static readonly RULE_op_attribute = 105;
	public static readonly RULE_op_type_spec = 106;
	public static readonly RULE_parameter_decls = 107;
	public static readonly RULE_param_decl = 108;
	public static readonly RULE_param_attribute = 109;
	public static readonly RULE_raises_expr = 110;
	public static readonly RULE_context_expr = 111;
	public static readonly RULE_param_type_spec = 112;
	public static readonly RULE_fixed_pt_type = 113;
	public static readonly RULE_fixed_pt_const_type = 114;
	public static readonly RULE_value_base_type = 115;
	public static readonly RULE_constr_forward_decl = 116;
	public static readonly RULE_import_decl = 117;
	public static readonly RULE_imported_scope = 118;
	public static readonly RULE_type_id_decl = 119;
	public static readonly RULE_type_prefix_decl = 120;
	public static readonly RULE_readonly_attr_spec = 121;
	public static readonly RULE_readonly_attr_declarator = 122;
	public static readonly RULE_attr_spec = 123;
	public static readonly RULE_attr_declarator = 124;
	public static readonly RULE_attr_raises_expr = 125;
	public static readonly RULE_get_excep_expr = 126;
	public static readonly RULE_set_excep_expr = 127;
	public static readonly RULE_exception_list = 128;
	public static readonly RULE_component = 129;
	public static readonly RULE_component_forward_decl = 130;
	public static readonly RULE_component_decl = 131;
	public static readonly RULE_component_header = 132;
	public static readonly RULE_supported_interface_spec = 133;
	public static readonly RULE_component_inheritance_spec = 134;
	public static readonly RULE_component_body = 135;
	public static readonly RULE_component_export = 136;
	public static readonly RULE_provides_decl = 137;
	public static readonly RULE_interface_type = 138;
	public static readonly RULE_uses_decl = 139;
	public static readonly RULE_emits_decl = 140;
	public static readonly RULE_publishes_decl = 141;
	public static readonly RULE_consumes_decl = 142;
	public static readonly RULE_home_decl = 143;
	public static readonly RULE_home_header = 144;
	public static readonly RULE_home_inheritance_spec = 145;
	public static readonly RULE_primary_key_spec = 146;
	public static readonly RULE_home_body = 147;
	public static readonly RULE_home_export = 148;
	public static readonly RULE_factory_decl = 149;
	public static readonly RULE_finder_decl = 150;
	public static readonly RULE_event = 151;
	public static readonly RULE_event_forward_decl = 152;
	public static readonly RULE_event_abs_decl = 153;
	public static readonly RULE_event_decl = 154;
	public static readonly RULE_event_header = 155;
	public static readonly RULE_annapps = 156;
	public static readonly RULE_annotation_appl = 157;
	public static readonly RULE_annotation_appl_params = 158;
	public static readonly RULE_annotation_appl_param = 159;
	public static readonly RULE_identifier = 160;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"specification", "definition", "module", "interface_or_forward_decl", 
		"interface_decl", "forward_decl", "interface_header", "interface_body", 
		"export_", "interface_inheritance_spec", "interface_name", "a_scoped_name", 
		"scoped_name", "value", "value_forward_decl", "value_box_decl", "value_abs_decl", 
		"value_decl", "value_header", "value_inheritance_spec", "value_name", 
		"value_element", "state_member", "init_decl", "init_param_decls", "init_param_decl", 
		"init_param_attribute", "const_decl", "const_type", "const_exp", "or_expr", 
		"xor_expr", "and_expr", "shift_expr", "add_expr", "mult_expr", "unary_expr", 
		"unary_operator", "primary_expr", "literal", "positive_int_const", "type_decl", 
		"type_declarator", "type_spec", "simple_type_spec", "bitfield_type_spec", 
		"base_type_spec", "template_type_spec", "constr_type_spec", "simple_declarators", 
		"declarators", "declarator", "simple_declarator", "complex_declarator", 
		"floating_pt_type", "integer_type", "signed_int", "signed_tiny_int", "signed_short_int", 
		"signed_long_int", "signed_longlong_int", "unsigned_int", "unsigned_tiny_int", 
		"unsigned_short_int", "unsigned_long_int", "unsigned_longlong_int", "char_type", 
		"wide_char_type", "boolean_type", "octet_type", "any_type", "object_type", 
		"annotation_decl", "annotation_def", "annotation_header", "annotation_inheritance_spec", 
		"annotation_body", "annotation_member", "annotation_forward_dcl", "bitset_type", 
		"bitfield", "bitfield_spec", "bitmask_type", "bit_values", "struct_type", 
		"member_list", "member", "union_type", "switch_type_spec", "switch_body", 
		"case_stmt", "case_label", "element_spec", "enum_type", "enumerator", 
		"sequence_type", "set_type", "map_type", "string_type", "wide_string_type", 
		"array_declarator", "fixed_array_size", "attr_decl", "except_decl", "op_decl", 
		"op_attribute", "op_type_spec", "parameter_decls", "param_decl", "param_attribute", 
		"raises_expr", "context_expr", "param_type_spec", "fixed_pt_type", "fixed_pt_const_type", 
		"value_base_type", "constr_forward_decl", "import_decl", "imported_scope", 
		"type_id_decl", "type_prefix_decl", "readonly_attr_spec", "readonly_attr_declarator", 
		"attr_spec", "attr_declarator", "attr_raises_expr", "get_excep_expr", 
		"set_excep_expr", "exception_list", "component", "component_forward_decl", 
		"component_decl", "component_header", "supported_interface_spec", "component_inheritance_spec", 
		"component_body", "component_export", "provides_decl", "interface_type", 
		"uses_decl", "emits_decl", "publishes_decl", "consumes_decl", "home_decl", 
		"home_header", "home_inheritance_spec", "primary_key_spec", "home_body", 
		"home_export", "factory_decl", "finder_decl", "event", "event_forward_decl", 
		"event_abs_decl", "event_decl", "event_header", "annapps", "annotation_appl", 
		"annotation_appl_params", "annotation_appl_param", "identifier",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, "';'", "':'", "','", "'{'", 
		"'}'", "'('", "')'", "'['", "']'", "'~'", "'/'", "'<'", "'>'", "'*'", 
		"'+'", "'-'", "'^'", "'&'", "'|'", "'='", "'%'", "'::'", "'>>'", "'<<'", 
		"'@'", "'setraises'", "'out'", "'emits'", "'string'", "'switch'", "'publishes'", 
		"'typedef'", "'uses'", "'primarykey'", "'custom'", "'octet'", "'sequence'", 
		"'import'", "'struct'", "'native'", "'readonly'", "'finder'", "'raises'", 
		"'void'", "'private'", "'eventtype'", "'wchar'", "'in'", "'default'", 
		"'public'", "'short'", "'long'", "'enum'", "'wstring'", "'context'", "'home'", 
		"'factory'", "'exception'", "'getraises'", "'const'", "'ValueBase'", "'valuetype'", 
		"'supports'", "'module'", "'Object'", "'truncatable'", "'unsigned'", "'fixed'", 
		"'union'", "'oneway'", "'any'", "'char'", "'case'", "'float'", "'boolean'", 
		"'multiple'", "'abstract'", "'inout'", "'provides'", "'consumes'", "'double'", 
		"'typeprefix'", "'typeid'", "'attribute'", "'local'", "'manages'", "'interface'", 
		"'component'", "'set'", "'map'", "'bitfield'", "'bitset'", "'bitmask'", 
		"'int8'", "'uint8'", "'int16'", "'uint16'", "'int32'", "'uint32'", "'int64'", 
		"'uint64'", "'@annotation'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, "INTEGER_LITERAL", "OCTAL_LITERAL", "HEX_LITERAL", "FLOATING_PT_LITERAL", 
		"FIXED_PT_LITERAL", "WIDE_CHARACTER_LITERAL", "CHARACTER_LITERAL", "WIDE_STRING_LITERAL", 
		"STRING_LITERAL", "BOOLEAN_LITERAL", "SEMICOLON", "COLON", "COMMA", "LEFT_BRACE", 
		"RIGHT_BRACE", "LEFT_BRACKET", "RIGHT_BRACKET", "LEFT_SQUARE_BRACKET", 
		"RIGHT_SQUARE_BRACKET", "TILDE", "SLASH", "LEFT_ANG_BRACKET", "RIGHT_ANG_BRACKET", 
		"STAR", "PLUS", "MINUS", "CARET", "AMPERSAND", "PIPE", "EQUAL", "PERCENT", 
		"DOUBLE_COLON", "RIGHT_SHIFT", "LEFT_SHIFT", "AT", "KW_SETRAISES", "KW_OUT", 
		"KW_EMITS", "KW_STRING", "KW_SWITCH", "KW_PUBLISHES", "KW_TYPEDEF", "KW_USES", 
		"KW_PRIMARYKEY", "KW_CUSTOM", "KW_OCTET", "KW_SEQUENCE", "KW_IMPORT", 
		"KW_STRUCT", "KW_NATIVE", "KW_READONLY", "KW_FINDER", "KW_RAISES", "KW_VOID", 
		"KW_PRIVATE", "KW_EVENTTYPE", "KW_WCHAR", "KW_IN", "KW_DEFAULT", "KW_PUBLIC", 
		"KW_SHORT", "KW_LONG", "KW_ENUM", "KW_WSTRING", "KW_CONTEXT", "KW_HOME", 
		"KW_FACTORY", "KW_EXCEPTION", "KW_GETRAISES", "KW_CONST", "KW_VALUEBASE", 
		"KW_VALUETYPE", "KW_SUPPORTS", "KW_MODULE", "KW_OBJECT", "KW_TRUNCATABLE", 
		"KW_UNSIGNED", "KW_FIXED", "KW_UNION", "KW_ONEWAY", "KW_ANY", "KW_CHAR", 
		"KW_CASE", "KW_FLOAT", "KW_BOOLEAN", "KW_MULTIPLE", "KW_ABSTRACT", "KW_INOUT", 
		"KW_PROVIDES", "KW_CONSUMES", "KW_DOUBLE", "KW_TYPEPREFIX", "KW_TYPEID", 
		"KW_ATTRIBUTE", "KW_LOCAL", "KW_MANAGES", "KW_INTERFACE", "KW_COMPONENT", 
		"KW_SET", "KW_MAP", "KW_BITFIELD", "KW_BITSET", "KW_BITMASK", "KW_INT8", 
		"KW_UINT8", "KW_INT16", "KW_UINT16", "KW_INT32", "KW_UINT32", "KW_INT64", 
		"KW_UINT64", "KW_AT_ANNOTATION", "ID", "WS", "COMMENT", "LINE_COMMENT",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(IDLParser._LITERAL_NAMES, IDLParser._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return IDLParser.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace

	// @Override
	public get grammarFileName(): string { return "IDL.g4"; }

	// @Override
	public get ruleNames(): string[] { return IDLParser.ruleNames; }

	// @Override
	public get serializedATN(): string { return IDLParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(IDLParser._ATN, this);
	}
	// @RuleVersion(0)
	public specification(): SpecificationContext {
		let _localctx: SpecificationContext = new SpecificationContext(this._ctx, this.state);
		this.enterRule(_localctx, 0, IDLParser.RULE_specification);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 325;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 0, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 322;
					this.import_decl();
					}
					}
				}
				this.state = 327;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 0, this._ctx);
			}
			this.state = 329;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 328;
				this.definition();
				}
				}
				this.state = 331;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la === IDLParser.STRING_LITERAL || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (IDLParser.DOUBLE_COLON - 32)) | (1 << (IDLParser.AT - 32)) | (1 << (IDLParser.KW_OUT - 32)) | (1 << (IDLParser.KW_EMITS - 32)) | (1 << (IDLParser.KW_STRING - 32)) | (1 << (IDLParser.KW_PUBLISHES - 32)) | (1 << (IDLParser.KW_TYPEDEF - 32)) | (1 << (IDLParser.KW_USES - 32)) | (1 << (IDLParser.KW_CUSTOM - 32)) | (1 << (IDLParser.KW_OCTET - 32)) | (1 << (IDLParser.KW_SEQUENCE - 32)) | (1 << (IDLParser.KW_IMPORT - 32)) | (1 << (IDLParser.KW_STRUCT - 32)) | (1 << (IDLParser.KW_NATIVE - 32)) | (1 << (IDLParser.KW_READONLY - 32)) | (1 << (IDLParser.KW_FINDER - 32)) | (1 << (IDLParser.KW_VOID - 32)) | (1 << (IDLParser.KW_PRIVATE - 32)) | (1 << (IDLParser.KW_EVENTTYPE - 32)) | (1 << (IDLParser.KW_WCHAR - 32)) | (1 << (IDLParser.KW_IN - 32)) | (1 << (IDLParser.KW_DEFAULT - 32)) | (1 << (IDLParser.KW_PUBLIC - 32)) | (1 << (IDLParser.KW_SHORT - 32)) | (1 << (IDLParser.KW_LONG - 32)) | (1 << (IDLParser.KW_ENUM - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (IDLParser.KW_WSTRING - 64)) | (1 << (IDLParser.KW_HOME - 64)) | (1 << (IDLParser.KW_FACTORY - 64)) | (1 << (IDLParser.KW_EXCEPTION - 64)) | (1 << (IDLParser.KW_CONST - 64)) | (1 << (IDLParser.KW_VALUEBASE - 64)) | (1 << (IDLParser.KW_VALUETYPE - 64)) | (1 << (IDLParser.KW_MODULE - 64)) | (1 << (IDLParser.KW_OBJECT - 64)) | (1 << (IDLParser.KW_UNSIGNED - 64)) | (1 << (IDLParser.KW_FIXED - 64)) | (1 << (IDLParser.KW_UNION - 64)) | (1 << (IDLParser.KW_ONEWAY - 64)) | (1 << (IDLParser.KW_ANY - 64)) | (1 << (IDLParser.KW_CHAR - 64)) | (1 << (IDLParser.KW_CASE - 64)) | (1 << (IDLParser.KW_FLOAT - 64)) | (1 << (IDLParser.KW_BOOLEAN - 64)) | (1 << (IDLParser.KW_ABSTRACT - 64)) | (1 << (IDLParser.KW_INOUT - 64)) | (1 << (IDLParser.KW_PROVIDES - 64)) | (1 << (IDLParser.KW_CONSUMES - 64)) | (1 << (IDLParser.KW_DOUBLE - 64)) | (1 << (IDLParser.KW_TYPEPREFIX - 64)) | (1 << (IDLParser.KW_TYPEID - 64)) | (1 << (IDLParser.KW_ATTRIBUTE - 64)) | (1 << (IDLParser.KW_LOCAL - 64)))) !== 0) || ((((_la - 97)) & ~0x1F) === 0 && ((1 << (_la - 97)) & ((1 << (IDLParser.KW_INTERFACE - 97)) | (1 << (IDLParser.KW_COMPONENT - 97)) | (1 << (IDLParser.KW_SET - 97)) | (1 << (IDLParser.KW_MAP - 97)) | (1 << (IDLParser.KW_BITFIELD - 97)) | (1 << (IDLParser.KW_BITSET - 97)) | (1 << (IDLParser.KW_BITMASK - 97)) | (1 << (IDLParser.KW_INT8 - 97)) | (1 << (IDLParser.KW_UINT8 - 97)) | (1 << (IDLParser.KW_INT16 - 97)) | (1 << (IDLParser.KW_UINT16 - 97)) | (1 << (IDLParser.KW_INT32 - 97)) | (1 << (IDLParser.KW_UINT32 - 97)) | (1 << (IDLParser.KW_INT64 - 97)) | (1 << (IDLParser.KW_UINT64 - 97)) | (1 << (IDLParser.KW_AT_ANNOTATION - 97)) | (1 << (IDLParser.ID - 97)))) !== 0));
			this.state = 333;
			this.match(IDLParser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public definition(): DefinitionContext {
		let _localctx: DefinitionContext = new DefinitionContext(this._ctx, this.state);
		this.enterRule(_localctx, 2, IDLParser.RULE_definition);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 335;
			this.annapps();
			this.state = 372;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 2, this._ctx) ) {
			case 1:
				{
				this.state = 336;
				this.type_decl();
				this.state = 337;
				this.match(IDLParser.SEMICOLON);
				}
				break;

			case 2:
				{
				this.state = 339;
				this.const_decl();
				this.state = 340;
				this.match(IDLParser.SEMICOLON);
				}
				break;

			case 3:
				{
				this.state = 342;
				this.except_decl();
				this.state = 343;
				this.match(IDLParser.SEMICOLON);
				}
				break;

			case 4:
				{
				this.state = 345;
				this.interface_or_forward_decl();
				this.state = 346;
				this.match(IDLParser.SEMICOLON);
				}
				break;

			case 5:
				{
				this.state = 348;
				this.module();
				this.state = 349;
				this.match(IDLParser.SEMICOLON);
				}
				break;

			case 6:
				{
				this.state = 351;
				this.value();
				this.state = 352;
				this.match(IDLParser.SEMICOLON);
				}
				break;

			case 7:
				{
				this.state = 354;
				this.type_id_decl();
				this.state = 355;
				this.match(IDLParser.SEMICOLON);
				}
				break;

			case 8:
				{
				this.state = 357;
				this.type_prefix_decl();
				this.state = 358;
				this.match(IDLParser.SEMICOLON);
				}
				break;

			case 9:
				{
				this.state = 360;
				this.event();
				this.state = 361;
				this.match(IDLParser.SEMICOLON);
				}
				break;

			case 10:
				{
				this.state = 363;
				this.component();
				this.state = 364;
				this.match(IDLParser.SEMICOLON);
				}
				break;

			case 11:
				{
				this.state = 366;
				this.home_decl();
				this.state = 367;
				this.match(IDLParser.SEMICOLON);
				}
				break;

			case 12:
				{
				this.state = 369;
				this.annotation_decl();
				this.state = 370;
				this.match(IDLParser.SEMICOLON);
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public module(): ModuleContext {
		let _localctx: ModuleContext = new ModuleContext(this._ctx, this.state);
		this.enterRule(_localctx, 4, IDLParser.RULE_module);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 374;
			this.match(IDLParser.KW_MODULE);
			this.state = 375;
			this.identifier();
			this.state = 376;
			this.match(IDLParser.LEFT_BRACE);
			this.state = 378;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 377;
				this.definition();
				}
				}
				this.state = 380;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la === IDLParser.STRING_LITERAL || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (IDLParser.DOUBLE_COLON - 32)) | (1 << (IDLParser.AT - 32)) | (1 << (IDLParser.KW_OUT - 32)) | (1 << (IDLParser.KW_EMITS - 32)) | (1 << (IDLParser.KW_STRING - 32)) | (1 << (IDLParser.KW_PUBLISHES - 32)) | (1 << (IDLParser.KW_TYPEDEF - 32)) | (1 << (IDLParser.KW_USES - 32)) | (1 << (IDLParser.KW_CUSTOM - 32)) | (1 << (IDLParser.KW_OCTET - 32)) | (1 << (IDLParser.KW_SEQUENCE - 32)) | (1 << (IDLParser.KW_IMPORT - 32)) | (1 << (IDLParser.KW_STRUCT - 32)) | (1 << (IDLParser.KW_NATIVE - 32)) | (1 << (IDLParser.KW_READONLY - 32)) | (1 << (IDLParser.KW_FINDER - 32)) | (1 << (IDLParser.KW_VOID - 32)) | (1 << (IDLParser.KW_PRIVATE - 32)) | (1 << (IDLParser.KW_EVENTTYPE - 32)) | (1 << (IDLParser.KW_WCHAR - 32)) | (1 << (IDLParser.KW_IN - 32)) | (1 << (IDLParser.KW_DEFAULT - 32)) | (1 << (IDLParser.KW_PUBLIC - 32)) | (1 << (IDLParser.KW_SHORT - 32)) | (1 << (IDLParser.KW_LONG - 32)) | (1 << (IDLParser.KW_ENUM - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (IDLParser.KW_WSTRING - 64)) | (1 << (IDLParser.KW_HOME - 64)) | (1 << (IDLParser.KW_FACTORY - 64)) | (1 << (IDLParser.KW_EXCEPTION - 64)) | (1 << (IDLParser.KW_CONST - 64)) | (1 << (IDLParser.KW_VALUEBASE - 64)) | (1 << (IDLParser.KW_VALUETYPE - 64)) | (1 << (IDLParser.KW_MODULE - 64)) | (1 << (IDLParser.KW_OBJECT - 64)) | (1 << (IDLParser.KW_UNSIGNED - 64)) | (1 << (IDLParser.KW_FIXED - 64)) | (1 << (IDLParser.KW_UNION - 64)) | (1 << (IDLParser.KW_ONEWAY - 64)) | (1 << (IDLParser.KW_ANY - 64)) | (1 << (IDLParser.KW_CHAR - 64)) | (1 << (IDLParser.KW_CASE - 64)) | (1 << (IDLParser.KW_FLOAT - 64)) | (1 << (IDLParser.KW_BOOLEAN - 64)) | (1 << (IDLParser.KW_ABSTRACT - 64)) | (1 << (IDLParser.KW_INOUT - 64)) | (1 << (IDLParser.KW_PROVIDES - 64)) | (1 << (IDLParser.KW_CONSUMES - 64)) | (1 << (IDLParser.KW_DOUBLE - 64)) | (1 << (IDLParser.KW_TYPEPREFIX - 64)) | (1 << (IDLParser.KW_TYPEID - 64)) | (1 << (IDLParser.KW_ATTRIBUTE - 64)) | (1 << (IDLParser.KW_LOCAL - 64)))) !== 0) || ((((_la - 97)) & ~0x1F) === 0 && ((1 << (_la - 97)) & ((1 << (IDLParser.KW_INTERFACE - 97)) | (1 << (IDLParser.KW_COMPONENT - 97)) | (1 << (IDLParser.KW_SET - 97)) | (1 << (IDLParser.KW_MAP - 97)) | (1 << (IDLParser.KW_BITFIELD - 97)) | (1 << (IDLParser.KW_BITSET - 97)) | (1 << (IDLParser.KW_BITMASK - 97)) | (1 << (IDLParser.KW_INT8 - 97)) | (1 << (IDLParser.KW_UINT8 - 97)) | (1 << (IDLParser.KW_INT16 - 97)) | (1 << (IDLParser.KW_UINT16 - 97)) | (1 << (IDLParser.KW_INT32 - 97)) | (1 << (IDLParser.KW_UINT32 - 97)) | (1 << (IDLParser.KW_INT64 - 97)) | (1 << (IDLParser.KW_UINT64 - 97)) | (1 << (IDLParser.KW_AT_ANNOTATION - 97)) | (1 << (IDLParser.ID - 97)))) !== 0));
			this.state = 382;
			this.match(IDLParser.RIGHT_BRACE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public interface_or_forward_decl(): Interface_or_forward_declContext {
		let _localctx: Interface_or_forward_declContext = new Interface_or_forward_declContext(this._ctx, this.state);
		this.enterRule(_localctx, 6, IDLParser.RULE_interface_or_forward_decl);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 384;
			this.annapps();
			this.state = 387;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 4, this._ctx) ) {
			case 1:
				{
				this.state = 385;
				this.interface_decl();
				}
				break;

			case 2:
				{
				this.state = 386;
				this.forward_decl();
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public interface_decl(): Interface_declContext {
		let _localctx: Interface_declContext = new Interface_declContext(this._ctx, this.state);
		this.enterRule(_localctx, 8, IDLParser.RULE_interface_decl);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 389;
			this.interface_header();
			this.state = 390;
			this.match(IDLParser.LEFT_BRACE);
			this.state = 391;
			this.interface_body();
			this.state = 392;
			this.match(IDLParser.RIGHT_BRACE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public forward_decl(): Forward_declContext {
		let _localctx: Forward_declContext = new Forward_declContext(this._ctx, this.state);
		this.enterRule(_localctx, 10, IDLParser.RULE_forward_decl);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 395;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === IDLParser.KW_ABSTRACT || _la === IDLParser.KW_LOCAL) {
				{
				this.state = 394;
				_la = this._input.LA(1);
				if (!(_la === IDLParser.KW_ABSTRACT || _la === IDLParser.KW_LOCAL)) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				}
			}

			this.state = 397;
			this.match(IDLParser.KW_INTERFACE);
			this.state = 398;
			this.identifier();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public interface_header(): Interface_headerContext {
		let _localctx: Interface_headerContext = new Interface_headerContext(this._ctx, this.state);
		this.enterRule(_localctx, 12, IDLParser.RULE_interface_header);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 401;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === IDLParser.KW_ABSTRACT || _la === IDLParser.KW_LOCAL) {
				{
				this.state = 400;
				_la = this._input.LA(1);
				if (!(_la === IDLParser.KW_ABSTRACT || _la === IDLParser.KW_LOCAL)) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				}
			}

			this.state = 403;
			this.match(IDLParser.KW_INTERFACE);
			this.state = 404;
			this.identifier();
			this.state = 406;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === IDLParser.COLON) {
				{
				this.state = 405;
				this.interface_inheritance_spec();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public interface_body(): Interface_bodyContext {
		let _localctx: Interface_bodyContext = new Interface_bodyContext(this._ctx, this.state);
		this.enterRule(_localctx, 14, IDLParser.RULE_interface_body);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 411;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === IDLParser.STRING_LITERAL || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (IDLParser.DOUBLE_COLON - 32)) | (1 << (IDLParser.AT - 32)) | (1 << (IDLParser.KW_OUT - 32)) | (1 << (IDLParser.KW_EMITS - 32)) | (1 << (IDLParser.KW_STRING - 32)) | (1 << (IDLParser.KW_PUBLISHES - 32)) | (1 << (IDLParser.KW_TYPEDEF - 32)) | (1 << (IDLParser.KW_USES - 32)) | (1 << (IDLParser.KW_CUSTOM - 32)) | (1 << (IDLParser.KW_OCTET - 32)) | (1 << (IDLParser.KW_SEQUENCE - 32)) | (1 << (IDLParser.KW_IMPORT - 32)) | (1 << (IDLParser.KW_STRUCT - 32)) | (1 << (IDLParser.KW_NATIVE - 32)) | (1 << (IDLParser.KW_READONLY - 32)) | (1 << (IDLParser.KW_FINDER - 32)) | (1 << (IDLParser.KW_VOID - 32)) | (1 << (IDLParser.KW_PRIVATE - 32)) | (1 << (IDLParser.KW_EVENTTYPE - 32)) | (1 << (IDLParser.KW_WCHAR - 32)) | (1 << (IDLParser.KW_IN - 32)) | (1 << (IDLParser.KW_DEFAULT - 32)) | (1 << (IDLParser.KW_PUBLIC - 32)) | (1 << (IDLParser.KW_SHORT - 32)) | (1 << (IDLParser.KW_LONG - 32)) | (1 << (IDLParser.KW_ENUM - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (IDLParser.KW_WSTRING - 64)) | (1 << (IDLParser.KW_HOME - 64)) | (1 << (IDLParser.KW_FACTORY - 64)) | (1 << (IDLParser.KW_EXCEPTION - 64)) | (1 << (IDLParser.KW_CONST - 64)) | (1 << (IDLParser.KW_VALUEBASE - 64)) | (1 << (IDLParser.KW_VALUETYPE - 64)) | (1 << (IDLParser.KW_MODULE - 64)) | (1 << (IDLParser.KW_OBJECT - 64)) | (1 << (IDLParser.KW_UNSIGNED - 64)) | (1 << (IDLParser.KW_FIXED - 64)) | (1 << (IDLParser.KW_UNION - 64)) | (1 << (IDLParser.KW_ONEWAY - 64)) | (1 << (IDLParser.KW_ANY - 64)) | (1 << (IDLParser.KW_CHAR - 64)) | (1 << (IDLParser.KW_CASE - 64)) | (1 << (IDLParser.KW_FLOAT - 64)) | (1 << (IDLParser.KW_BOOLEAN - 64)) | (1 << (IDLParser.KW_ABSTRACT - 64)) | (1 << (IDLParser.KW_INOUT - 64)) | (1 << (IDLParser.KW_PROVIDES - 64)) | (1 << (IDLParser.KW_CONSUMES - 64)) | (1 << (IDLParser.KW_DOUBLE - 64)) | (1 << (IDLParser.KW_TYPEPREFIX - 64)) | (1 << (IDLParser.KW_TYPEID - 64)) | (1 << (IDLParser.KW_ATTRIBUTE - 64)) | (1 << (IDLParser.KW_LOCAL - 64)))) !== 0) || ((((_la - 97)) & ~0x1F) === 0 && ((1 << (_la - 97)) & ((1 << (IDLParser.KW_INTERFACE - 97)) | (1 << (IDLParser.KW_COMPONENT - 97)) | (1 << (IDLParser.KW_SET - 97)) | (1 << (IDLParser.KW_MAP - 97)) | (1 << (IDLParser.KW_BITFIELD - 97)) | (1 << (IDLParser.KW_BITSET - 97)) | (1 << (IDLParser.KW_BITMASK - 97)) | (1 << (IDLParser.KW_INT8 - 97)) | (1 << (IDLParser.KW_UINT8 - 97)) | (1 << (IDLParser.KW_INT16 - 97)) | (1 << (IDLParser.KW_UINT16 - 97)) | (1 << (IDLParser.KW_INT32 - 97)) | (1 << (IDLParser.KW_UINT32 - 97)) | (1 << (IDLParser.KW_INT64 - 97)) | (1 << (IDLParser.KW_UINT64 - 97)) | (1 << (IDLParser.KW_AT_ANNOTATION - 97)) | (1 << (IDLParser.ID - 97)))) !== 0)) {
				{
				{
				this.state = 408;
				this.export_();
				}
				}
				this.state = 413;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public export_(): Export_Context {
		let _localctx: Export_Context = new Export_Context(this._ctx, this.state);
		this.enterRule(_localctx, 16, IDLParser.RULE_export_);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 414;
			this.annapps();
			this.state = 436;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 9, this._ctx) ) {
			case 1:
				{
				this.state = 415;
				this.type_decl();
				this.state = 416;
				this.match(IDLParser.SEMICOLON);
				}
				break;

			case 2:
				{
				this.state = 418;
				this.const_decl();
				this.state = 419;
				this.match(IDLParser.SEMICOLON);
				}
				break;

			case 3:
				{
				this.state = 421;
				this.except_decl();
				this.state = 422;
				this.match(IDLParser.SEMICOLON);
				}
				break;

			case 4:
				{
				this.state = 424;
				this.attr_decl();
				this.state = 425;
				this.match(IDLParser.SEMICOLON);
				}
				break;

			case 5:
				{
				this.state = 427;
				this.op_decl();
				this.state = 428;
				this.match(IDLParser.SEMICOLON);
				}
				break;

			case 6:
				{
				this.state = 430;
				this.type_id_decl();
				this.state = 431;
				this.match(IDLParser.SEMICOLON);
				}
				break;

			case 7:
				{
				this.state = 433;
				this.type_prefix_decl();
				this.state = 434;
				this.match(IDLParser.SEMICOLON);
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public interface_inheritance_spec(): Interface_inheritance_specContext {
		let _localctx: Interface_inheritance_specContext = new Interface_inheritance_specContext(this._ctx, this.state);
		this.enterRule(_localctx, 18, IDLParser.RULE_interface_inheritance_spec);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 438;
			this.match(IDLParser.COLON);
			this.state = 439;
			this.interface_name();
			this.state = 444;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === IDLParser.COMMA) {
				{
				{
				this.state = 440;
				this.match(IDLParser.COMMA);
				this.state = 441;
				this.interface_name();
				}
				}
				this.state = 446;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public interface_name(): Interface_nameContext {
		let _localctx: Interface_nameContext = new Interface_nameContext(this._ctx, this.state);
		this.enterRule(_localctx, 20, IDLParser.RULE_interface_name);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 447;
			this.a_scoped_name();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public a_scoped_name(): A_scoped_nameContext {
		let _localctx: A_scoped_nameContext = new A_scoped_nameContext(this._ctx, this.state);
		this.enterRule(_localctx, 22, IDLParser.RULE_a_scoped_name);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 449;
			this.annapps();
			this.state = 450;
			this.scoped_name();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public scoped_name(): Scoped_nameContext {
		let _localctx: Scoped_nameContext = new Scoped_nameContext(this._ctx, this.state);
		this.enterRule(_localctx, 24, IDLParser.RULE_scoped_name);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 453;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === IDLParser.DOUBLE_COLON) {
				{
				this.state = 452;
				this.match(IDLParser.DOUBLE_COLON);
				}
			}

			this.state = 455;
			this.match(IDLParser.ID);
			this.state = 460;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 12, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 456;
					this.match(IDLParser.DOUBLE_COLON);
					this.state = 457;
					this.match(IDLParser.ID);
					}
					}
				}
				this.state = 462;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 12, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public value(): ValueContext {
		let _localctx: ValueContext = new ValueContext(this._ctx, this.state);
		this.enterRule(_localctx, 26, IDLParser.RULE_value);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 463;
			this.annapps();
			this.state = 468;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 13, this._ctx) ) {
			case 1:
				{
				this.state = 464;
				this.value_decl();
				}
				break;

			case 2:
				{
				this.state = 465;
				this.value_abs_decl();
				}
				break;

			case 3:
				{
				this.state = 466;
				this.value_box_decl();
				}
				break;

			case 4:
				{
				this.state = 467;
				this.value_forward_decl();
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public value_forward_decl(): Value_forward_declContext {
		let _localctx: Value_forward_declContext = new Value_forward_declContext(this._ctx, this.state);
		this.enterRule(_localctx, 28, IDLParser.RULE_value_forward_decl);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 471;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === IDLParser.KW_ABSTRACT) {
				{
				this.state = 470;
				this.match(IDLParser.KW_ABSTRACT);
				}
			}

			this.state = 473;
			this.match(IDLParser.KW_VALUETYPE);
			this.state = 474;
			this.identifier();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public value_box_decl(): Value_box_declContext {
		let _localctx: Value_box_declContext = new Value_box_declContext(this._ctx, this.state);
		this.enterRule(_localctx, 30, IDLParser.RULE_value_box_decl);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 476;
			this.match(IDLParser.KW_VALUETYPE);
			this.state = 477;
			this.identifier();
			this.state = 478;
			this.type_spec();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public value_abs_decl(): Value_abs_declContext {
		let _localctx: Value_abs_declContext = new Value_abs_declContext(this._ctx, this.state);
		this.enterRule(_localctx, 32, IDLParser.RULE_value_abs_decl);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 480;
			this.match(IDLParser.KW_ABSTRACT);
			this.state = 481;
			this.match(IDLParser.KW_VALUETYPE);
			this.state = 482;
			this.identifier();
			this.state = 483;
			this.value_inheritance_spec();
			this.state = 484;
			this.match(IDLParser.LEFT_BRACE);
			this.state = 488;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === IDLParser.STRING_LITERAL || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (IDLParser.DOUBLE_COLON - 32)) | (1 << (IDLParser.AT - 32)) | (1 << (IDLParser.KW_OUT - 32)) | (1 << (IDLParser.KW_EMITS - 32)) | (1 << (IDLParser.KW_STRING - 32)) | (1 << (IDLParser.KW_PUBLISHES - 32)) | (1 << (IDLParser.KW_TYPEDEF - 32)) | (1 << (IDLParser.KW_USES - 32)) | (1 << (IDLParser.KW_CUSTOM - 32)) | (1 << (IDLParser.KW_OCTET - 32)) | (1 << (IDLParser.KW_SEQUENCE - 32)) | (1 << (IDLParser.KW_IMPORT - 32)) | (1 << (IDLParser.KW_STRUCT - 32)) | (1 << (IDLParser.KW_NATIVE - 32)) | (1 << (IDLParser.KW_READONLY - 32)) | (1 << (IDLParser.KW_FINDER - 32)) | (1 << (IDLParser.KW_VOID - 32)) | (1 << (IDLParser.KW_PRIVATE - 32)) | (1 << (IDLParser.KW_EVENTTYPE - 32)) | (1 << (IDLParser.KW_WCHAR - 32)) | (1 << (IDLParser.KW_IN - 32)) | (1 << (IDLParser.KW_DEFAULT - 32)) | (1 << (IDLParser.KW_PUBLIC - 32)) | (1 << (IDLParser.KW_SHORT - 32)) | (1 << (IDLParser.KW_LONG - 32)) | (1 << (IDLParser.KW_ENUM - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (IDLParser.KW_WSTRING - 64)) | (1 << (IDLParser.KW_HOME - 64)) | (1 << (IDLParser.KW_FACTORY - 64)) | (1 << (IDLParser.KW_EXCEPTION - 64)) | (1 << (IDLParser.KW_CONST - 64)) | (1 << (IDLParser.KW_VALUEBASE - 64)) | (1 << (IDLParser.KW_VALUETYPE - 64)) | (1 << (IDLParser.KW_MODULE - 64)) | (1 << (IDLParser.KW_OBJECT - 64)) | (1 << (IDLParser.KW_UNSIGNED - 64)) | (1 << (IDLParser.KW_FIXED - 64)) | (1 << (IDLParser.KW_UNION - 64)) | (1 << (IDLParser.KW_ONEWAY - 64)) | (1 << (IDLParser.KW_ANY - 64)) | (1 << (IDLParser.KW_CHAR - 64)) | (1 << (IDLParser.KW_CASE - 64)) | (1 << (IDLParser.KW_FLOAT - 64)) | (1 << (IDLParser.KW_BOOLEAN - 64)) | (1 << (IDLParser.KW_ABSTRACT - 64)) | (1 << (IDLParser.KW_INOUT - 64)) | (1 << (IDLParser.KW_PROVIDES - 64)) | (1 << (IDLParser.KW_CONSUMES - 64)) | (1 << (IDLParser.KW_DOUBLE - 64)) | (1 << (IDLParser.KW_TYPEPREFIX - 64)) | (1 << (IDLParser.KW_TYPEID - 64)) | (1 << (IDLParser.KW_ATTRIBUTE - 64)) | (1 << (IDLParser.KW_LOCAL - 64)))) !== 0) || ((((_la - 97)) & ~0x1F) === 0 && ((1 << (_la - 97)) & ((1 << (IDLParser.KW_INTERFACE - 97)) | (1 << (IDLParser.KW_COMPONENT - 97)) | (1 << (IDLParser.KW_SET - 97)) | (1 << (IDLParser.KW_MAP - 97)) | (1 << (IDLParser.KW_BITFIELD - 97)) | (1 << (IDLParser.KW_BITSET - 97)) | (1 << (IDLParser.KW_BITMASK - 97)) | (1 << (IDLParser.KW_INT8 - 97)) | (1 << (IDLParser.KW_UINT8 - 97)) | (1 << (IDLParser.KW_INT16 - 97)) | (1 << (IDLParser.KW_UINT16 - 97)) | (1 << (IDLParser.KW_INT32 - 97)) | (1 << (IDLParser.KW_UINT32 - 97)) | (1 << (IDLParser.KW_INT64 - 97)) | (1 << (IDLParser.KW_UINT64 - 97)) | (1 << (IDLParser.KW_AT_ANNOTATION - 97)) | (1 << (IDLParser.ID - 97)))) !== 0)) {
				{
				{
				this.state = 485;
				this.export_();
				}
				}
				this.state = 490;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 491;
			this.match(IDLParser.RIGHT_BRACE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public value_decl(): Value_declContext {
		let _localctx: Value_declContext = new Value_declContext(this._ctx, this.state);
		this.enterRule(_localctx, 34, IDLParser.RULE_value_decl);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 493;
			this.value_header();
			this.state = 494;
			this.match(IDLParser.LEFT_BRACE);
			this.state = 498;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === IDLParser.STRING_LITERAL || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (IDLParser.DOUBLE_COLON - 32)) | (1 << (IDLParser.AT - 32)) | (1 << (IDLParser.KW_OUT - 32)) | (1 << (IDLParser.KW_EMITS - 32)) | (1 << (IDLParser.KW_STRING - 32)) | (1 << (IDLParser.KW_PUBLISHES - 32)) | (1 << (IDLParser.KW_TYPEDEF - 32)) | (1 << (IDLParser.KW_USES - 32)) | (1 << (IDLParser.KW_CUSTOM - 32)) | (1 << (IDLParser.KW_OCTET - 32)) | (1 << (IDLParser.KW_SEQUENCE - 32)) | (1 << (IDLParser.KW_IMPORT - 32)) | (1 << (IDLParser.KW_STRUCT - 32)) | (1 << (IDLParser.KW_NATIVE - 32)) | (1 << (IDLParser.KW_READONLY - 32)) | (1 << (IDLParser.KW_FINDER - 32)) | (1 << (IDLParser.KW_VOID - 32)) | (1 << (IDLParser.KW_PRIVATE - 32)) | (1 << (IDLParser.KW_EVENTTYPE - 32)) | (1 << (IDLParser.KW_WCHAR - 32)) | (1 << (IDLParser.KW_IN - 32)) | (1 << (IDLParser.KW_DEFAULT - 32)) | (1 << (IDLParser.KW_PUBLIC - 32)) | (1 << (IDLParser.KW_SHORT - 32)) | (1 << (IDLParser.KW_LONG - 32)) | (1 << (IDLParser.KW_ENUM - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (IDLParser.KW_WSTRING - 64)) | (1 << (IDLParser.KW_HOME - 64)) | (1 << (IDLParser.KW_FACTORY - 64)) | (1 << (IDLParser.KW_EXCEPTION - 64)) | (1 << (IDLParser.KW_CONST - 64)) | (1 << (IDLParser.KW_VALUEBASE - 64)) | (1 << (IDLParser.KW_VALUETYPE - 64)) | (1 << (IDLParser.KW_MODULE - 64)) | (1 << (IDLParser.KW_OBJECT - 64)) | (1 << (IDLParser.KW_UNSIGNED - 64)) | (1 << (IDLParser.KW_FIXED - 64)) | (1 << (IDLParser.KW_UNION - 64)) | (1 << (IDLParser.KW_ONEWAY - 64)) | (1 << (IDLParser.KW_ANY - 64)) | (1 << (IDLParser.KW_CHAR - 64)) | (1 << (IDLParser.KW_CASE - 64)) | (1 << (IDLParser.KW_FLOAT - 64)) | (1 << (IDLParser.KW_BOOLEAN - 64)) | (1 << (IDLParser.KW_ABSTRACT - 64)) | (1 << (IDLParser.KW_INOUT - 64)) | (1 << (IDLParser.KW_PROVIDES - 64)) | (1 << (IDLParser.KW_CONSUMES - 64)) | (1 << (IDLParser.KW_DOUBLE - 64)) | (1 << (IDLParser.KW_TYPEPREFIX - 64)) | (1 << (IDLParser.KW_TYPEID - 64)) | (1 << (IDLParser.KW_ATTRIBUTE - 64)) | (1 << (IDLParser.KW_LOCAL - 64)))) !== 0) || ((((_la - 97)) & ~0x1F) === 0 && ((1 << (_la - 97)) & ((1 << (IDLParser.KW_INTERFACE - 97)) | (1 << (IDLParser.KW_COMPONENT - 97)) | (1 << (IDLParser.KW_SET - 97)) | (1 << (IDLParser.KW_MAP - 97)) | (1 << (IDLParser.KW_BITFIELD - 97)) | (1 << (IDLParser.KW_BITSET - 97)) | (1 << (IDLParser.KW_BITMASK - 97)) | (1 << (IDLParser.KW_INT8 - 97)) | (1 << (IDLParser.KW_UINT8 - 97)) | (1 << (IDLParser.KW_INT16 - 97)) | (1 << (IDLParser.KW_UINT16 - 97)) | (1 << (IDLParser.KW_INT32 - 97)) | (1 << (IDLParser.KW_UINT32 - 97)) | (1 << (IDLParser.KW_INT64 - 97)) | (1 << (IDLParser.KW_UINT64 - 97)) | (1 << (IDLParser.KW_AT_ANNOTATION - 97)) | (1 << (IDLParser.ID - 97)))) !== 0)) {
				{
				{
				this.state = 495;
				this.value_element();
				}
				}
				this.state = 500;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 501;
			this.match(IDLParser.RIGHT_BRACE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public value_header(): Value_headerContext {
		let _localctx: Value_headerContext = new Value_headerContext(this._ctx, this.state);
		this.enterRule(_localctx, 36, IDLParser.RULE_value_header);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 504;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === IDLParser.KW_CUSTOM) {
				{
				this.state = 503;
				this.match(IDLParser.KW_CUSTOM);
				}
			}

			this.state = 506;
			this.match(IDLParser.KW_VALUETYPE);
			this.state = 507;
			this.identifier();
			this.state = 508;
			this.value_inheritance_spec();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public value_inheritance_spec(): Value_inheritance_specContext {
		let _localctx: Value_inheritance_specContext = new Value_inheritance_specContext(this._ctx, this.state);
		this.enterRule(_localctx, 38, IDLParser.RULE_value_inheritance_spec);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 522;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === IDLParser.COLON) {
				{
				this.state = 510;
				this.match(IDLParser.COLON);
				this.state = 512;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === IDLParser.KW_TRUNCATABLE) {
					{
					this.state = 511;
					this.match(IDLParser.KW_TRUNCATABLE);
					}
				}

				this.state = 514;
				this.value_name();
				this.state = 519;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === IDLParser.COMMA) {
					{
					{
					this.state = 515;
					this.match(IDLParser.COMMA);
					this.state = 516;
					this.value_name();
					}
					}
					this.state = 521;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
			}

			this.state = 533;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === IDLParser.KW_SUPPORTS) {
				{
				this.state = 524;
				this.match(IDLParser.KW_SUPPORTS);
				this.state = 525;
				this.interface_name();
				this.state = 530;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === IDLParser.COMMA) {
					{
					{
					this.state = 526;
					this.match(IDLParser.COMMA);
					this.state = 527;
					this.interface_name();
					}
					}
					this.state = 532;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public value_name(): Value_nameContext {
		let _localctx: Value_nameContext = new Value_nameContext(this._ctx, this.state);
		this.enterRule(_localctx, 40, IDLParser.RULE_value_name);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 535;
			this.a_scoped_name();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public value_element(): Value_elementContext {
		let _localctx: Value_elementContext = new Value_elementContext(this._ctx, this.state);
		this.enterRule(_localctx, 42, IDLParser.RULE_value_element);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 540;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 23, this._ctx) ) {
			case 1:
				{
				this.state = 537;
				this.export_();
				}
				break;

			case 2:
				{
				this.state = 538;
				this.state_member();
				}
				break;

			case 3:
				{
				this.state = 539;
				this.init_decl();
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public state_member(): State_memberContext {
		let _localctx: State_memberContext = new State_memberContext(this._ctx, this.state);
		this.enterRule(_localctx, 44, IDLParser.RULE_state_member);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 542;
			this.annapps();
			this.state = 547;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case IDLParser.KW_PUBLIC:
				{
				this.state = 543;
				this.match(IDLParser.KW_PUBLIC);
				this.state = 544;
				this.annapps();
				}
				break;
			case IDLParser.KW_PRIVATE:
				{
				this.state = 545;
				this.match(IDLParser.KW_PRIVATE);
				this.state = 546;
				this.annapps();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 549;
			this.type_spec();
			this.state = 550;
			this.declarators();
			this.state = 551;
			this.match(IDLParser.SEMICOLON);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public init_decl(): Init_declContext {
		let _localctx: Init_declContext = new Init_declContext(this._ctx, this.state);
		this.enterRule(_localctx, 46, IDLParser.RULE_init_decl);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 553;
			this.annapps();
			this.state = 554;
			this.match(IDLParser.KW_FACTORY);
			this.state = 555;
			this.identifier();
			this.state = 556;
			this.match(IDLParser.LEFT_BRACKET);
			this.state = 558;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === IDLParser.STRING_LITERAL || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (IDLParser.DOUBLE_COLON - 32)) | (1 << (IDLParser.AT - 32)) | (1 << (IDLParser.KW_OUT - 32)) | (1 << (IDLParser.KW_EMITS - 32)) | (1 << (IDLParser.KW_STRING - 32)) | (1 << (IDLParser.KW_PUBLISHES - 32)) | (1 << (IDLParser.KW_TYPEDEF - 32)) | (1 << (IDLParser.KW_USES - 32)) | (1 << (IDLParser.KW_CUSTOM - 32)) | (1 << (IDLParser.KW_OCTET - 32)) | (1 << (IDLParser.KW_SEQUENCE - 32)) | (1 << (IDLParser.KW_IMPORT - 32)) | (1 << (IDLParser.KW_STRUCT - 32)) | (1 << (IDLParser.KW_NATIVE - 32)) | (1 << (IDLParser.KW_READONLY - 32)) | (1 << (IDLParser.KW_FINDER - 32)) | (1 << (IDLParser.KW_VOID - 32)) | (1 << (IDLParser.KW_PRIVATE - 32)) | (1 << (IDLParser.KW_EVENTTYPE - 32)) | (1 << (IDLParser.KW_WCHAR - 32)) | (1 << (IDLParser.KW_IN - 32)) | (1 << (IDLParser.KW_DEFAULT - 32)) | (1 << (IDLParser.KW_PUBLIC - 32)) | (1 << (IDLParser.KW_SHORT - 32)) | (1 << (IDLParser.KW_LONG - 32)) | (1 << (IDLParser.KW_ENUM - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (IDLParser.KW_WSTRING - 64)) | (1 << (IDLParser.KW_HOME - 64)) | (1 << (IDLParser.KW_FACTORY - 64)) | (1 << (IDLParser.KW_EXCEPTION - 64)) | (1 << (IDLParser.KW_CONST - 64)) | (1 << (IDLParser.KW_VALUEBASE - 64)) | (1 << (IDLParser.KW_VALUETYPE - 64)) | (1 << (IDLParser.KW_MODULE - 64)) | (1 << (IDLParser.KW_OBJECT - 64)) | (1 << (IDLParser.KW_UNSIGNED - 64)) | (1 << (IDLParser.KW_FIXED - 64)) | (1 << (IDLParser.KW_UNION - 64)) | (1 << (IDLParser.KW_ONEWAY - 64)) | (1 << (IDLParser.KW_ANY - 64)) | (1 << (IDLParser.KW_CHAR - 64)) | (1 << (IDLParser.KW_CASE - 64)) | (1 << (IDLParser.KW_FLOAT - 64)) | (1 << (IDLParser.KW_BOOLEAN - 64)) | (1 << (IDLParser.KW_ABSTRACT - 64)) | (1 << (IDLParser.KW_INOUT - 64)) | (1 << (IDLParser.KW_PROVIDES - 64)) | (1 << (IDLParser.KW_CONSUMES - 64)) | (1 << (IDLParser.KW_DOUBLE - 64)) | (1 << (IDLParser.KW_TYPEPREFIX - 64)) | (1 << (IDLParser.KW_TYPEID - 64)) | (1 << (IDLParser.KW_ATTRIBUTE - 64)) | (1 << (IDLParser.KW_LOCAL - 64)))) !== 0) || ((((_la - 97)) & ~0x1F) === 0 && ((1 << (_la - 97)) & ((1 << (IDLParser.KW_INTERFACE - 97)) | (1 << (IDLParser.KW_COMPONENT - 97)) | (1 << (IDLParser.KW_SET - 97)) | (1 << (IDLParser.KW_MAP - 97)) | (1 << (IDLParser.KW_BITFIELD - 97)) | (1 << (IDLParser.KW_BITSET - 97)) | (1 << (IDLParser.KW_BITMASK - 97)) | (1 << (IDLParser.KW_INT8 - 97)) | (1 << (IDLParser.KW_UINT8 - 97)) | (1 << (IDLParser.KW_INT16 - 97)) | (1 << (IDLParser.KW_UINT16 - 97)) | (1 << (IDLParser.KW_INT32 - 97)) | (1 << (IDLParser.KW_UINT32 - 97)) | (1 << (IDLParser.KW_INT64 - 97)) | (1 << (IDLParser.KW_UINT64 - 97)) | (1 << (IDLParser.KW_AT_ANNOTATION - 97)) | (1 << (IDLParser.ID - 97)))) !== 0)) {
				{
				this.state = 557;
				this.init_param_decls();
				}
			}

			this.state = 560;
			this.match(IDLParser.RIGHT_BRACKET);
			this.state = 562;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === IDLParser.KW_RAISES) {
				{
				this.state = 561;
				this.raises_expr();
				}
			}

			this.state = 564;
			this.match(IDLParser.SEMICOLON);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public init_param_decls(): Init_param_declsContext {
		let _localctx: Init_param_declsContext = new Init_param_declsContext(this._ctx, this.state);
		this.enterRule(_localctx, 48, IDLParser.RULE_init_param_decls);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 566;
			this.init_param_decl();
			this.state = 571;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === IDLParser.COMMA) {
				{
				{
				this.state = 567;
				this.match(IDLParser.COMMA);
				this.state = 568;
				this.init_param_decl();
				}
				}
				this.state = 573;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public init_param_decl(): Init_param_declContext {
		let _localctx: Init_param_declContext = new Init_param_declContext(this._ctx, this.state);
		this.enterRule(_localctx, 50, IDLParser.RULE_init_param_decl);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 574;
			this.annapps();
			this.state = 575;
			this.init_param_attribute();
			this.state = 576;
			this.annapps();
			this.state = 577;
			this.param_type_spec();
			this.state = 578;
			this.annapps();
			this.state = 579;
			this.simple_declarator();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public init_param_attribute(): Init_param_attributeContext {
		let _localctx: Init_param_attributeContext = new Init_param_attributeContext(this._ctx, this.state);
		this.enterRule(_localctx, 52, IDLParser.RULE_init_param_attribute);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 581;
			this.match(IDLParser.KW_IN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public const_decl(): Const_declContext {
		let _localctx: Const_declContext = new Const_declContext(this._ctx, this.state);
		this.enterRule(_localctx, 54, IDLParser.RULE_const_decl);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 583;
			this.match(IDLParser.KW_CONST);
			this.state = 584;
			this.const_type();
			this.state = 585;
			this.identifier();
			this.state = 586;
			this.match(IDLParser.EQUAL);
			this.state = 587;
			this.const_exp();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public const_type(): Const_typeContext {
		let _localctx: Const_typeContext = new Const_typeContext(this._ctx, this.state);
		this.enterRule(_localctx, 56, IDLParser.RULE_const_type);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 589;
			this.annapps();
			this.state = 600;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 28, this._ctx) ) {
			case 1:
				{
				this.state = 590;
				this.integer_type();
				}
				break;

			case 2:
				{
				this.state = 591;
				this.char_type();
				}
				break;

			case 3:
				{
				this.state = 592;
				this.wide_char_type();
				}
				break;

			case 4:
				{
				this.state = 593;
				this.boolean_type();
				}
				break;

			case 5:
				{
				this.state = 594;
				this.floating_pt_type();
				}
				break;

			case 6:
				{
				this.state = 595;
				this.string_type();
				}
				break;

			case 7:
				{
				this.state = 596;
				this.wide_string_type();
				}
				break;

			case 8:
				{
				this.state = 597;
				this.fixed_pt_const_type();
				}
				break;

			case 9:
				{
				this.state = 598;
				this.scoped_name();
				}
				break;

			case 10:
				{
				this.state = 599;
				this.octet_type();
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public const_exp(): Const_expContext {
		let _localctx: Const_expContext = new Const_expContext(this._ctx, this.state);
		this.enterRule(_localctx, 58, IDLParser.RULE_const_exp);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 602;
			this.or_expr();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public or_expr(): Or_exprContext {
		let _localctx: Or_exprContext = new Or_exprContext(this._ctx, this.state);
		this.enterRule(_localctx, 60, IDLParser.RULE_or_expr);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 604;
			this.xor_expr();
			this.state = 609;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === IDLParser.PIPE) {
				{
				{
				this.state = 605;
				this.match(IDLParser.PIPE);
				this.state = 606;
				this.xor_expr();
				}
				}
				this.state = 611;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public xor_expr(): Xor_exprContext {
		let _localctx: Xor_exprContext = new Xor_exprContext(this._ctx, this.state);
		this.enterRule(_localctx, 62, IDLParser.RULE_xor_expr);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 612;
			this.and_expr();
			this.state = 617;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === IDLParser.CARET) {
				{
				{
				this.state = 613;
				this.match(IDLParser.CARET);
				this.state = 614;
				this.and_expr();
				}
				}
				this.state = 619;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public and_expr(): And_exprContext {
		let _localctx: And_exprContext = new And_exprContext(this._ctx, this.state);
		this.enterRule(_localctx, 64, IDLParser.RULE_and_expr);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 620;
			this.shift_expr();
			this.state = 625;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === IDLParser.AMPERSAND) {
				{
				{
				this.state = 621;
				this.match(IDLParser.AMPERSAND);
				this.state = 622;
				this.shift_expr();
				}
				}
				this.state = 627;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public shift_expr(): Shift_exprContext {
		let _localctx: Shift_exprContext = new Shift_exprContext(this._ctx, this.state);
		this.enterRule(_localctx, 66, IDLParser.RULE_shift_expr);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 628;
			this.add_expr();
			this.state = 633;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === IDLParser.RIGHT_SHIFT || _la === IDLParser.LEFT_SHIFT) {
				{
				{
				this.state = 629;
				_la = this._input.LA(1);
				if (!(_la === IDLParser.RIGHT_SHIFT || _la === IDLParser.LEFT_SHIFT)) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				this.state = 630;
				this.add_expr();
				}
				}
				this.state = 635;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public add_expr(): Add_exprContext {
		let _localctx: Add_exprContext = new Add_exprContext(this._ctx, this.state);
		this.enterRule(_localctx, 68, IDLParser.RULE_add_expr);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 636;
			this.mult_expr();
			this.state = 641;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === IDLParser.PLUS || _la === IDLParser.MINUS) {
				{
				{
				this.state = 637;
				_la = this._input.LA(1);
				if (!(_la === IDLParser.PLUS || _la === IDLParser.MINUS)) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				this.state = 638;
				this.mult_expr();
				}
				}
				this.state = 643;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public mult_expr(): Mult_exprContext {
		let _localctx: Mult_exprContext = new Mult_exprContext(this._ctx, this.state);
		this.enterRule(_localctx, 70, IDLParser.RULE_mult_expr);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 644;
			this.unary_expr();
			this.state = 649;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << IDLParser.SLASH) | (1 << IDLParser.STAR) | (1 << IDLParser.PERCENT))) !== 0)) {
				{
				{
				this.state = 645;
				_la = this._input.LA(1);
				if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << IDLParser.SLASH) | (1 << IDLParser.STAR) | (1 << IDLParser.PERCENT))) !== 0))) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				this.state = 646;
				this.unary_expr();
				}
				}
				this.state = 651;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public unary_expr(): Unary_exprContext {
		let _localctx: Unary_exprContext = new Unary_exprContext(this._ctx, this.state);
		this.enterRule(_localctx, 72, IDLParser.RULE_unary_expr);
		try {
			this.state = 656;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case IDLParser.TILDE:
			case IDLParser.PLUS:
			case IDLParser.MINUS:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 652;
				this.unary_operator();
				this.state = 653;
				this.primary_expr();
				}
				break;
			case IDLParser.INTEGER_LITERAL:
			case IDLParser.OCTAL_LITERAL:
			case IDLParser.HEX_LITERAL:
			case IDLParser.FLOATING_PT_LITERAL:
			case IDLParser.FIXED_PT_LITERAL:
			case IDLParser.WIDE_CHARACTER_LITERAL:
			case IDLParser.CHARACTER_LITERAL:
			case IDLParser.WIDE_STRING_LITERAL:
			case IDLParser.STRING_LITERAL:
			case IDLParser.BOOLEAN_LITERAL:
			case IDLParser.LEFT_BRACKET:
			case IDLParser.DOUBLE_COLON:
			case IDLParser.ID:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 655;
				this.primary_expr();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public unary_operator(): Unary_operatorContext {
		let _localctx: Unary_operatorContext = new Unary_operatorContext(this._ctx, this.state);
		this.enterRule(_localctx, 74, IDLParser.RULE_unary_operator);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 658;
			_la = this._input.LA(1);
			if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << IDLParser.TILDE) | (1 << IDLParser.PLUS) | (1 << IDLParser.MINUS))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public primary_expr(): Primary_exprContext {
		let _localctx: Primary_exprContext = new Primary_exprContext(this._ctx, this.state);
		this.enterRule(_localctx, 76, IDLParser.RULE_primary_expr);
		try {
			this.state = 666;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case IDLParser.DOUBLE_COLON:
			case IDLParser.ID:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 660;
				this.scoped_name();
				}
				break;
			case IDLParser.INTEGER_LITERAL:
			case IDLParser.OCTAL_LITERAL:
			case IDLParser.HEX_LITERAL:
			case IDLParser.FLOATING_PT_LITERAL:
			case IDLParser.FIXED_PT_LITERAL:
			case IDLParser.WIDE_CHARACTER_LITERAL:
			case IDLParser.CHARACTER_LITERAL:
			case IDLParser.WIDE_STRING_LITERAL:
			case IDLParser.STRING_LITERAL:
			case IDLParser.BOOLEAN_LITERAL:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 661;
				this.literal();
				}
				break;
			case IDLParser.LEFT_BRACKET:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 662;
				this.match(IDLParser.LEFT_BRACKET);
				this.state = 663;
				this.const_exp();
				this.state = 664;
				this.match(IDLParser.RIGHT_BRACKET);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public literal(): LiteralContext {
		let _localctx: LiteralContext = new LiteralContext(this._ctx, this.state);
		this.enterRule(_localctx, 78, IDLParser.RULE_literal);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 668;
			_la = this._input.LA(1);
			if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << IDLParser.INTEGER_LITERAL) | (1 << IDLParser.OCTAL_LITERAL) | (1 << IDLParser.HEX_LITERAL) | (1 << IDLParser.FLOATING_PT_LITERAL) | (1 << IDLParser.FIXED_PT_LITERAL) | (1 << IDLParser.WIDE_CHARACTER_LITERAL) | (1 << IDLParser.CHARACTER_LITERAL) | (1 << IDLParser.WIDE_STRING_LITERAL) | (1 << IDLParser.STRING_LITERAL) | (1 << IDLParser.BOOLEAN_LITERAL))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public positive_int_const(): Positive_int_constContext {
		let _localctx: Positive_int_constContext = new Positive_int_constContext(this._ctx, this.state);
		this.enterRule(_localctx, 80, IDLParser.RULE_positive_int_const);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 670;
			this.const_exp();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public type_decl(): Type_declContext {
		let _localctx: Type_declContext = new Type_declContext(this._ctx, this.state);
		this.enterRule(_localctx, 82, IDLParser.RULE_type_decl);
		try {
			this.state = 686;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 37, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 672;
				this.match(IDLParser.KW_TYPEDEF);
				this.state = 673;
				this.annapps();
				this.state = 674;
				this.type_declarator();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 676;
				this.struct_type();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 677;
				this.union_type();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 678;
				this.enum_type();
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 679;
				this.bitset_type();
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 680;
				this.bitmask_type();
				}
				break;

			case 7:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 681;
				this.match(IDLParser.KW_NATIVE);
				this.state = 682;
				this.annapps();
				this.state = 683;
				this.simple_declarator();
				}
				break;

			case 8:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 685;
				this.constr_forward_decl();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public type_declarator(): Type_declaratorContext {
		let _localctx: Type_declaratorContext = new Type_declaratorContext(this._ctx, this.state);
		this.enterRule(_localctx, 84, IDLParser.RULE_type_declarator);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 688;
			this.type_spec();
			this.state = 689;
			this.declarators();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public type_spec(): Type_specContext {
		let _localctx: Type_specContext = new Type_specContext(this._ctx, this.state);
		this.enterRule(_localctx, 86, IDLParser.RULE_type_spec);
		try {
			this.state = 693;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case IDLParser.DOUBLE_COLON:
			case IDLParser.KW_STRING:
			case IDLParser.KW_OCTET:
			case IDLParser.KW_SEQUENCE:
			case IDLParser.KW_WCHAR:
			case IDLParser.KW_SHORT:
			case IDLParser.KW_LONG:
			case IDLParser.KW_WSTRING:
			case IDLParser.KW_VALUEBASE:
			case IDLParser.KW_OBJECT:
			case IDLParser.KW_UNSIGNED:
			case IDLParser.KW_FIXED:
			case IDLParser.KW_ANY:
			case IDLParser.KW_CHAR:
			case IDLParser.KW_FLOAT:
			case IDLParser.KW_BOOLEAN:
			case IDLParser.KW_DOUBLE:
			case IDLParser.KW_SET:
			case IDLParser.KW_MAP:
			case IDLParser.KW_INT8:
			case IDLParser.KW_UINT8:
			case IDLParser.KW_INT16:
			case IDLParser.KW_UINT16:
			case IDLParser.KW_INT32:
			case IDLParser.KW_UINT32:
			case IDLParser.KW_INT64:
			case IDLParser.KW_UINT64:
			case IDLParser.ID:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 691;
				this.simple_type_spec();
				}
				break;
			case IDLParser.KW_STRUCT:
			case IDLParser.KW_ENUM:
			case IDLParser.KW_UNION:
			case IDLParser.KW_BITSET:
			case IDLParser.KW_BITMASK:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 692;
				this.constr_type_spec();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public simple_type_spec(): Simple_type_specContext {
		let _localctx: Simple_type_specContext = new Simple_type_specContext(this._ctx, this.state);
		this.enterRule(_localctx, 88, IDLParser.RULE_simple_type_spec);
		try {
			this.state = 698;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case IDLParser.KW_OCTET:
			case IDLParser.KW_WCHAR:
			case IDLParser.KW_SHORT:
			case IDLParser.KW_LONG:
			case IDLParser.KW_VALUEBASE:
			case IDLParser.KW_OBJECT:
			case IDLParser.KW_UNSIGNED:
			case IDLParser.KW_ANY:
			case IDLParser.KW_CHAR:
			case IDLParser.KW_FLOAT:
			case IDLParser.KW_BOOLEAN:
			case IDLParser.KW_DOUBLE:
			case IDLParser.KW_INT8:
			case IDLParser.KW_UINT8:
			case IDLParser.KW_INT16:
			case IDLParser.KW_UINT16:
			case IDLParser.KW_INT32:
			case IDLParser.KW_UINT32:
			case IDLParser.KW_INT64:
			case IDLParser.KW_UINT64:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 695;
				this.base_type_spec();
				}
				break;
			case IDLParser.KW_STRING:
			case IDLParser.KW_SEQUENCE:
			case IDLParser.KW_WSTRING:
			case IDLParser.KW_FIXED:
			case IDLParser.KW_SET:
			case IDLParser.KW_MAP:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 696;
				this.template_type_spec();
				}
				break;
			case IDLParser.DOUBLE_COLON:
			case IDLParser.ID:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 697;
				this.scoped_name();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public bitfield_type_spec(): Bitfield_type_specContext {
		let _localctx: Bitfield_type_specContext = new Bitfield_type_specContext(this._ctx, this.state);
		this.enterRule(_localctx, 90, IDLParser.RULE_bitfield_type_spec);
		try {
			this.state = 703;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case IDLParser.KW_SHORT:
			case IDLParser.KW_LONG:
			case IDLParser.KW_UNSIGNED:
			case IDLParser.KW_INT8:
			case IDLParser.KW_UINT8:
			case IDLParser.KW_INT16:
			case IDLParser.KW_UINT16:
			case IDLParser.KW_INT32:
			case IDLParser.KW_UINT32:
			case IDLParser.KW_INT64:
			case IDLParser.KW_UINT64:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 700;
				this.integer_type();
				}
				break;
			case IDLParser.KW_BOOLEAN:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 701;
				this.boolean_type();
				}
				break;
			case IDLParser.KW_OCTET:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 702;
				this.octet_type();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public base_type_spec(): Base_type_specContext {
		let _localctx: Base_type_specContext = new Base_type_specContext(this._ctx, this.state);
		this.enterRule(_localctx, 92, IDLParser.RULE_base_type_spec);
		try {
			this.state = 714;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 41, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 705;
				this.floating_pt_type();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 706;
				this.integer_type();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 707;
				this.char_type();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 708;
				this.wide_char_type();
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 709;
				this.boolean_type();
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 710;
				this.octet_type();
				}
				break;

			case 7:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 711;
				this.any_type();
				}
				break;

			case 8:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 712;
				this.object_type();
				}
				break;

			case 9:
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 713;
				this.value_base_type();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public template_type_spec(): Template_type_specContext {
		let _localctx: Template_type_specContext = new Template_type_specContext(this._ctx, this.state);
		this.enterRule(_localctx, 94, IDLParser.RULE_template_type_spec);
		try {
			this.state = 722;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case IDLParser.KW_SEQUENCE:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 716;
				this.sequence_type();
				}
				break;
			case IDLParser.KW_SET:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 717;
				this.set_type();
				}
				break;
			case IDLParser.KW_MAP:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 718;
				this.map_type();
				}
				break;
			case IDLParser.KW_STRING:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 719;
				this.string_type();
				}
				break;
			case IDLParser.KW_WSTRING:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 720;
				this.wide_string_type();
				}
				break;
			case IDLParser.KW_FIXED:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 721;
				this.fixed_pt_type();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public constr_type_spec(): Constr_type_specContext {
		let _localctx: Constr_type_specContext = new Constr_type_specContext(this._ctx, this.state);
		this.enterRule(_localctx, 96, IDLParser.RULE_constr_type_spec);
		try {
			this.state = 729;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case IDLParser.KW_STRUCT:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 724;
				this.struct_type();
				}
				break;
			case IDLParser.KW_UNION:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 725;
				this.union_type();
				}
				break;
			case IDLParser.KW_ENUM:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 726;
				this.enum_type();
				}
				break;
			case IDLParser.KW_BITSET:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 727;
				this.bitset_type();
				}
				break;
			case IDLParser.KW_BITMASK:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 728;
				this.bitmask_type();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public simple_declarators(): Simple_declaratorsContext {
		let _localctx: Simple_declaratorsContext = new Simple_declaratorsContext(this._ctx, this.state);
		this.enterRule(_localctx, 98, IDLParser.RULE_simple_declarators);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 731;
			this.identifier();
			this.state = 736;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === IDLParser.COMMA) {
				{
				{
				this.state = 732;
				this.match(IDLParser.COMMA);
				this.state = 733;
				this.identifier();
				}
				}
				this.state = 738;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public declarators(): DeclaratorsContext {
		let _localctx: DeclaratorsContext = new DeclaratorsContext(this._ctx, this.state);
		this.enterRule(_localctx, 100, IDLParser.RULE_declarators);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 739;
			this.declarator();
			this.state = 744;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === IDLParser.COMMA) {
				{
				{
				this.state = 740;
				this.match(IDLParser.COMMA);
				this.state = 741;
				this.declarator();
				}
				}
				this.state = 746;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public declarator(): DeclaratorContext {
		let _localctx: DeclaratorContext = new DeclaratorContext(this._ctx, this.state);
		this.enterRule(_localctx, 102, IDLParser.RULE_declarator);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 747;
			this.annapps();
			this.state = 750;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 46, this._ctx) ) {
			case 1:
				{
				this.state = 748;
				this.simple_declarator();
				}
				break;

			case 2:
				{
				this.state = 749;
				this.complex_declarator();
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public simple_declarator(): Simple_declaratorContext {
		let _localctx: Simple_declaratorContext = new Simple_declaratorContext(this._ctx, this.state);
		this.enterRule(_localctx, 104, IDLParser.RULE_simple_declarator);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 752;
			this.match(IDLParser.ID);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public complex_declarator(): Complex_declaratorContext {
		let _localctx: Complex_declaratorContext = new Complex_declaratorContext(this._ctx, this.state);
		this.enterRule(_localctx, 106, IDLParser.RULE_complex_declarator);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 754;
			this.array_declarator();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public floating_pt_type(): Floating_pt_typeContext {
		let _localctx: Floating_pt_typeContext = new Floating_pt_typeContext(this._ctx, this.state);
		this.enterRule(_localctx, 108, IDLParser.RULE_floating_pt_type);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 760;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case IDLParser.KW_FLOAT:
				{
				this.state = 756;
				this.match(IDLParser.KW_FLOAT);
				}
				break;
			case IDLParser.KW_DOUBLE:
				{
				this.state = 757;
				this.match(IDLParser.KW_DOUBLE);
				}
				break;
			case IDLParser.KW_LONG:
				{
				this.state = 758;
				this.match(IDLParser.KW_LONG);
				this.state = 759;
				this.match(IDLParser.KW_DOUBLE);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public integer_type(): Integer_typeContext {
		let _localctx: Integer_typeContext = new Integer_typeContext(this._ctx, this.state);
		this.enterRule(_localctx, 110, IDLParser.RULE_integer_type);
		try {
			this.state = 764;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case IDLParser.KW_SHORT:
			case IDLParser.KW_LONG:
			case IDLParser.KW_INT8:
			case IDLParser.KW_INT16:
			case IDLParser.KW_INT32:
			case IDLParser.KW_INT64:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 762;
				this.signed_int();
				}
				break;
			case IDLParser.KW_UNSIGNED:
			case IDLParser.KW_UINT8:
			case IDLParser.KW_UINT16:
			case IDLParser.KW_UINT32:
			case IDLParser.KW_UINT64:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 763;
				this.unsigned_int();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public signed_int(): Signed_intContext {
		let _localctx: Signed_intContext = new Signed_intContext(this._ctx, this.state);
		this.enterRule(_localctx, 112, IDLParser.RULE_signed_int);
		try {
			this.state = 770;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 49, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 766;
				this.signed_short_int();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 767;
				this.signed_long_int();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 768;
				this.signed_longlong_int();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 769;
				this.signed_tiny_int();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public signed_tiny_int(): Signed_tiny_intContext {
		let _localctx: Signed_tiny_intContext = new Signed_tiny_intContext(this._ctx, this.state);
		this.enterRule(_localctx, 114, IDLParser.RULE_signed_tiny_int);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 772;
			this.match(IDLParser.KW_INT8);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public signed_short_int(): Signed_short_intContext {
		let _localctx: Signed_short_intContext = new Signed_short_intContext(this._ctx, this.state);
		this.enterRule(_localctx, 116, IDLParser.RULE_signed_short_int);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 774;
			_la = this._input.LA(1);
			if (!(_la === IDLParser.KW_SHORT || _la === IDLParser.KW_INT16)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public signed_long_int(): Signed_long_intContext {
		let _localctx: Signed_long_intContext = new Signed_long_intContext(this._ctx, this.state);
		this.enterRule(_localctx, 118, IDLParser.RULE_signed_long_int);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 776;
			_la = this._input.LA(1);
			if (!(_la === IDLParser.KW_LONG || _la === IDLParser.KW_INT32)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public signed_longlong_int(): Signed_longlong_intContext {
		let _localctx: Signed_longlong_intContext = new Signed_longlong_intContext(this._ctx, this.state);
		this.enterRule(_localctx, 120, IDLParser.RULE_signed_longlong_int);
		try {
			this.state = 781;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case IDLParser.KW_LONG:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 778;
				this.match(IDLParser.KW_LONG);
				this.state = 779;
				this.match(IDLParser.KW_LONG);
				}
				break;
			case IDLParser.KW_INT64:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 780;
				this.match(IDLParser.KW_INT64);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public unsigned_int(): Unsigned_intContext {
		let _localctx: Unsigned_intContext = new Unsigned_intContext(this._ctx, this.state);
		this.enterRule(_localctx, 122, IDLParser.RULE_unsigned_int);
		try {
			this.state = 787;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 51, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 783;
				this.unsigned_short_int();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 784;
				this.unsigned_long_int();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 785;
				this.unsigned_longlong_int();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 786;
				this.unsigned_tiny_int();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public unsigned_tiny_int(): Unsigned_tiny_intContext {
		let _localctx: Unsigned_tiny_intContext = new Unsigned_tiny_intContext(this._ctx, this.state);
		this.enterRule(_localctx, 124, IDLParser.RULE_unsigned_tiny_int);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 789;
			this.match(IDLParser.KW_UINT8);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public unsigned_short_int(): Unsigned_short_intContext {
		let _localctx: Unsigned_short_intContext = new Unsigned_short_intContext(this._ctx, this.state);
		this.enterRule(_localctx, 126, IDLParser.RULE_unsigned_short_int);
		try {
			this.state = 794;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case IDLParser.KW_UNSIGNED:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 791;
				this.match(IDLParser.KW_UNSIGNED);
				this.state = 792;
				this.match(IDLParser.KW_SHORT);
				}
				break;
			case IDLParser.KW_UINT16:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 793;
				this.match(IDLParser.KW_UINT16);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public unsigned_long_int(): Unsigned_long_intContext {
		let _localctx: Unsigned_long_intContext = new Unsigned_long_intContext(this._ctx, this.state);
		this.enterRule(_localctx, 128, IDLParser.RULE_unsigned_long_int);
		try {
			this.state = 799;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case IDLParser.KW_UNSIGNED:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 796;
				this.match(IDLParser.KW_UNSIGNED);
				this.state = 797;
				this.match(IDLParser.KW_LONG);
				}
				break;
			case IDLParser.KW_UINT32:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 798;
				this.match(IDLParser.KW_UINT32);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public unsigned_longlong_int(): Unsigned_longlong_intContext {
		let _localctx: Unsigned_longlong_intContext = new Unsigned_longlong_intContext(this._ctx, this.state);
		this.enterRule(_localctx, 130, IDLParser.RULE_unsigned_longlong_int);
		try {
			this.state = 805;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case IDLParser.KW_UNSIGNED:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 801;
				this.match(IDLParser.KW_UNSIGNED);
				this.state = 802;
				this.match(IDLParser.KW_LONG);
				this.state = 803;
				this.match(IDLParser.KW_LONG);
				}
				break;
			case IDLParser.KW_UINT64:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 804;
				this.match(IDLParser.KW_UINT64);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public char_type(): Char_typeContext {
		let _localctx: Char_typeContext = new Char_typeContext(this._ctx, this.state);
		this.enterRule(_localctx, 132, IDLParser.RULE_char_type);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 807;
			this.match(IDLParser.KW_CHAR);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public wide_char_type(): Wide_char_typeContext {
		let _localctx: Wide_char_typeContext = new Wide_char_typeContext(this._ctx, this.state);
		this.enterRule(_localctx, 134, IDLParser.RULE_wide_char_type);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 809;
			this.match(IDLParser.KW_WCHAR);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public boolean_type(): Boolean_typeContext {
		let _localctx: Boolean_typeContext = new Boolean_typeContext(this._ctx, this.state);
		this.enterRule(_localctx, 136, IDLParser.RULE_boolean_type);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 811;
			this.match(IDLParser.KW_BOOLEAN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public octet_type(): Octet_typeContext {
		let _localctx: Octet_typeContext = new Octet_typeContext(this._ctx, this.state);
		this.enterRule(_localctx, 138, IDLParser.RULE_octet_type);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 813;
			this.match(IDLParser.KW_OCTET);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public any_type(): Any_typeContext {
		let _localctx: Any_typeContext = new Any_typeContext(this._ctx, this.state);
		this.enterRule(_localctx, 140, IDLParser.RULE_any_type);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 815;
			this.match(IDLParser.KW_ANY);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public object_type(): Object_typeContext {
		let _localctx: Object_typeContext = new Object_typeContext(this._ctx, this.state);
		this.enterRule(_localctx, 142, IDLParser.RULE_object_type);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 817;
			this.match(IDLParser.KW_OBJECT);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public annotation_decl(): Annotation_declContext {
		let _localctx: Annotation_declContext = new Annotation_declContext(this._ctx, this.state);
		this.enterRule(_localctx, 144, IDLParser.RULE_annotation_decl);
		try {
			this.state = 821;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 55, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 819;
				this.annotation_def();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 820;
				this.annotation_forward_dcl();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public annotation_def(): Annotation_defContext {
		let _localctx: Annotation_defContext = new Annotation_defContext(this._ctx, this.state);
		this.enterRule(_localctx, 146, IDLParser.RULE_annotation_def);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 823;
			this.annotation_header();
			this.state = 824;
			this.match(IDLParser.LEFT_BRACE);
			this.state = 825;
			this.annotation_body();
			this.state = 826;
			this.match(IDLParser.RIGHT_BRACE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public annotation_header(): Annotation_headerContext {
		let _localctx: Annotation_headerContext = new Annotation_headerContext(this._ctx, this.state);
		this.enterRule(_localctx, 148, IDLParser.RULE_annotation_header);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 828;
			this.match(IDLParser.KW_AT_ANNOTATION);
			this.state = 829;
			this.identifier();
			this.state = 831;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === IDLParser.COLON) {
				{
				this.state = 830;
				this.annotation_inheritance_spec();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public annotation_inheritance_spec(): Annotation_inheritance_specContext {
		let _localctx: Annotation_inheritance_specContext = new Annotation_inheritance_specContext(this._ctx, this.state);
		this.enterRule(_localctx, 150, IDLParser.RULE_annotation_inheritance_spec);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 833;
			this.match(IDLParser.COLON);
			this.state = 834;
			this.scoped_name();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public annotation_body(): Annotation_bodyContext {
		let _localctx: Annotation_bodyContext = new Annotation_bodyContext(this._ctx, this.state);
		this.enterRule(_localctx, 152, IDLParser.RULE_annotation_body);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 849;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === IDLParser.STRING_LITERAL || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (IDLParser.DOUBLE_COLON - 32)) | (1 << (IDLParser.AT - 32)) | (1 << (IDLParser.KW_OUT - 32)) | (1 << (IDLParser.KW_EMITS - 32)) | (1 << (IDLParser.KW_STRING - 32)) | (1 << (IDLParser.KW_PUBLISHES - 32)) | (1 << (IDLParser.KW_TYPEDEF - 32)) | (1 << (IDLParser.KW_USES - 32)) | (1 << (IDLParser.KW_CUSTOM - 32)) | (1 << (IDLParser.KW_OCTET - 32)) | (1 << (IDLParser.KW_SEQUENCE - 32)) | (1 << (IDLParser.KW_IMPORT - 32)) | (1 << (IDLParser.KW_STRUCT - 32)) | (1 << (IDLParser.KW_NATIVE - 32)) | (1 << (IDLParser.KW_READONLY - 32)) | (1 << (IDLParser.KW_FINDER - 32)) | (1 << (IDLParser.KW_VOID - 32)) | (1 << (IDLParser.KW_PRIVATE - 32)) | (1 << (IDLParser.KW_EVENTTYPE - 32)) | (1 << (IDLParser.KW_WCHAR - 32)) | (1 << (IDLParser.KW_IN - 32)) | (1 << (IDLParser.KW_DEFAULT - 32)) | (1 << (IDLParser.KW_PUBLIC - 32)) | (1 << (IDLParser.KW_SHORT - 32)) | (1 << (IDLParser.KW_LONG - 32)) | (1 << (IDLParser.KW_ENUM - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (IDLParser.KW_WSTRING - 64)) | (1 << (IDLParser.KW_HOME - 64)) | (1 << (IDLParser.KW_FACTORY - 64)) | (1 << (IDLParser.KW_EXCEPTION - 64)) | (1 << (IDLParser.KW_CONST - 64)) | (1 << (IDLParser.KW_VALUEBASE - 64)) | (1 << (IDLParser.KW_VALUETYPE - 64)) | (1 << (IDLParser.KW_MODULE - 64)) | (1 << (IDLParser.KW_OBJECT - 64)) | (1 << (IDLParser.KW_UNSIGNED - 64)) | (1 << (IDLParser.KW_FIXED - 64)) | (1 << (IDLParser.KW_UNION - 64)) | (1 << (IDLParser.KW_ONEWAY - 64)) | (1 << (IDLParser.KW_ANY - 64)) | (1 << (IDLParser.KW_CHAR - 64)) | (1 << (IDLParser.KW_CASE - 64)) | (1 << (IDLParser.KW_FLOAT - 64)) | (1 << (IDLParser.KW_BOOLEAN - 64)) | (1 << (IDLParser.KW_ABSTRACT - 64)) | (1 << (IDLParser.KW_INOUT - 64)) | (1 << (IDLParser.KW_PROVIDES - 64)) | (1 << (IDLParser.KW_CONSUMES - 64)) | (1 << (IDLParser.KW_DOUBLE - 64)) | (1 << (IDLParser.KW_TYPEPREFIX - 64)) | (1 << (IDLParser.KW_TYPEID - 64)) | (1 << (IDLParser.KW_ATTRIBUTE - 64)) | (1 << (IDLParser.KW_LOCAL - 64)))) !== 0) || ((((_la - 97)) & ~0x1F) === 0 && ((1 << (_la - 97)) & ((1 << (IDLParser.KW_INTERFACE - 97)) | (1 << (IDLParser.KW_COMPONENT - 97)) | (1 << (IDLParser.KW_SET - 97)) | (1 << (IDLParser.KW_MAP - 97)) | (1 << (IDLParser.KW_BITFIELD - 97)) | (1 << (IDLParser.KW_BITSET - 97)) | (1 << (IDLParser.KW_BITMASK - 97)) | (1 << (IDLParser.KW_INT8 - 97)) | (1 << (IDLParser.KW_UINT8 - 97)) | (1 << (IDLParser.KW_INT16 - 97)) | (1 << (IDLParser.KW_UINT16 - 97)) | (1 << (IDLParser.KW_INT32 - 97)) | (1 << (IDLParser.KW_UINT32 - 97)) | (1 << (IDLParser.KW_INT64 - 97)) | (1 << (IDLParser.KW_UINT64 - 97)) | (1 << (IDLParser.KW_AT_ANNOTATION - 97)) | (1 << (IDLParser.ID - 97)))) !== 0)) {
				{
				this.state = 847;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 57, this._ctx) ) {
				case 1:
					{
					this.state = 836;
					this.annotation_member();
					}
					break;

				case 2:
					{
					this.state = 837;
					this.enum_type();
					this.state = 838;
					this.match(IDLParser.SEMICOLON);
					}
					break;

				case 3:
					{
					this.state = 840;
					this.const_decl();
					this.state = 841;
					this.match(IDLParser.SEMICOLON);
					}
					break;

				case 4:
					{
					this.state = 843;
					this.match(IDLParser.KW_TYPEDEF);
					this.state = 844;
					this.type_declarator();
					this.state = 845;
					this.match(IDLParser.SEMICOLON);
					}
					break;
				}
				}
				this.state = 851;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public annotation_member(): Annotation_memberContext {
		let _localctx: Annotation_memberContext = new Annotation_memberContext(this._ctx, this.state);
		this.enterRule(_localctx, 154, IDLParser.RULE_annotation_member);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 852;
			this.const_type();
			this.state = 853;
			this.simple_declarator();
			this.state = 856;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === IDLParser.KW_DEFAULT) {
				{
				this.state = 854;
				this.match(IDLParser.KW_DEFAULT);
				this.state = 855;
				this.const_exp();
				}
			}

			this.state = 858;
			this.match(IDLParser.SEMICOLON);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public annotation_forward_dcl(): Annotation_forward_dclContext {
		let _localctx: Annotation_forward_dclContext = new Annotation_forward_dclContext(this._ctx, this.state);
		this.enterRule(_localctx, 156, IDLParser.RULE_annotation_forward_dcl);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 860;
			this.match(IDLParser.KW_AT_ANNOTATION);
			this.state = 861;
			this.scoped_name();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public bitset_type(): Bitset_typeContext {
		let _localctx: Bitset_typeContext = new Bitset_typeContext(this._ctx, this.state);
		this.enterRule(_localctx, 158, IDLParser.RULE_bitset_type);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 863;
			this.match(IDLParser.KW_BITSET);
			this.state = 864;
			this.identifier();
			this.state = 867;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === IDLParser.COLON) {
				{
				this.state = 865;
				this.match(IDLParser.COLON);
				this.state = 866;
				this.scoped_name();
				}
			}

			this.state = 869;
			this.match(IDLParser.LEFT_BRACE);
			this.state = 870;
			this.bitfield();
			this.state = 871;
			this.match(IDLParser.RIGHT_BRACE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public bitfield(): BitfieldContext {
		let _localctx: BitfieldContext = new BitfieldContext(this._ctx, this.state);
		this.enterRule(_localctx, 160, IDLParser.RULE_bitfield);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 879;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 873;
				this.bitfield_spec();
				this.state = 875;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === IDLParser.STRING_LITERAL || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (IDLParser.DOUBLE_COLON - 32)) | (1 << (IDLParser.AT - 32)) | (1 << (IDLParser.KW_OUT - 32)) | (1 << (IDLParser.KW_EMITS - 32)) | (1 << (IDLParser.KW_STRING - 32)) | (1 << (IDLParser.KW_PUBLISHES - 32)) | (1 << (IDLParser.KW_TYPEDEF - 32)) | (1 << (IDLParser.KW_USES - 32)) | (1 << (IDLParser.KW_CUSTOM - 32)) | (1 << (IDLParser.KW_OCTET - 32)) | (1 << (IDLParser.KW_SEQUENCE - 32)) | (1 << (IDLParser.KW_IMPORT - 32)) | (1 << (IDLParser.KW_STRUCT - 32)) | (1 << (IDLParser.KW_NATIVE - 32)) | (1 << (IDLParser.KW_READONLY - 32)) | (1 << (IDLParser.KW_FINDER - 32)) | (1 << (IDLParser.KW_VOID - 32)) | (1 << (IDLParser.KW_PRIVATE - 32)) | (1 << (IDLParser.KW_EVENTTYPE - 32)) | (1 << (IDLParser.KW_WCHAR - 32)) | (1 << (IDLParser.KW_IN - 32)) | (1 << (IDLParser.KW_DEFAULT - 32)) | (1 << (IDLParser.KW_PUBLIC - 32)) | (1 << (IDLParser.KW_SHORT - 32)) | (1 << (IDLParser.KW_LONG - 32)) | (1 << (IDLParser.KW_ENUM - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (IDLParser.KW_WSTRING - 64)) | (1 << (IDLParser.KW_HOME - 64)) | (1 << (IDLParser.KW_FACTORY - 64)) | (1 << (IDLParser.KW_EXCEPTION - 64)) | (1 << (IDLParser.KW_CONST - 64)) | (1 << (IDLParser.KW_VALUEBASE - 64)) | (1 << (IDLParser.KW_VALUETYPE - 64)) | (1 << (IDLParser.KW_MODULE - 64)) | (1 << (IDLParser.KW_OBJECT - 64)) | (1 << (IDLParser.KW_UNSIGNED - 64)) | (1 << (IDLParser.KW_FIXED - 64)) | (1 << (IDLParser.KW_UNION - 64)) | (1 << (IDLParser.KW_ONEWAY - 64)) | (1 << (IDLParser.KW_ANY - 64)) | (1 << (IDLParser.KW_CHAR - 64)) | (1 << (IDLParser.KW_CASE - 64)) | (1 << (IDLParser.KW_FLOAT - 64)) | (1 << (IDLParser.KW_BOOLEAN - 64)) | (1 << (IDLParser.KW_ABSTRACT - 64)) | (1 << (IDLParser.KW_INOUT - 64)) | (1 << (IDLParser.KW_PROVIDES - 64)) | (1 << (IDLParser.KW_CONSUMES - 64)) | (1 << (IDLParser.KW_DOUBLE - 64)) | (1 << (IDLParser.KW_TYPEPREFIX - 64)) | (1 << (IDLParser.KW_TYPEID - 64)) | (1 << (IDLParser.KW_ATTRIBUTE - 64)) | (1 << (IDLParser.KW_LOCAL - 64)))) !== 0) || ((((_la - 97)) & ~0x1F) === 0 && ((1 << (_la - 97)) & ((1 << (IDLParser.KW_INTERFACE - 97)) | (1 << (IDLParser.KW_COMPONENT - 97)) | (1 << (IDLParser.KW_SET - 97)) | (1 << (IDLParser.KW_MAP - 97)) | (1 << (IDLParser.KW_BITFIELD - 97)) | (1 << (IDLParser.KW_BITSET - 97)) | (1 << (IDLParser.KW_BITMASK - 97)) | (1 << (IDLParser.KW_INT8 - 97)) | (1 << (IDLParser.KW_UINT8 - 97)) | (1 << (IDLParser.KW_INT16 - 97)) | (1 << (IDLParser.KW_UINT16 - 97)) | (1 << (IDLParser.KW_INT32 - 97)) | (1 << (IDLParser.KW_UINT32 - 97)) | (1 << (IDLParser.KW_INT64 - 97)) | (1 << (IDLParser.KW_UINT64 - 97)) | (1 << (IDLParser.KW_AT_ANNOTATION - 97)) | (1 << (IDLParser.ID - 97)))) !== 0)) {
					{
					this.state = 874;
					this.simple_declarators();
					}
				}

				this.state = 877;
				this.match(IDLParser.SEMICOLON);
				}
				}
				this.state = 881;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la === IDLParser.STRING_LITERAL || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (IDLParser.DOUBLE_COLON - 32)) | (1 << (IDLParser.AT - 32)) | (1 << (IDLParser.KW_OUT - 32)) | (1 << (IDLParser.KW_EMITS - 32)) | (1 << (IDLParser.KW_STRING - 32)) | (1 << (IDLParser.KW_PUBLISHES - 32)) | (1 << (IDLParser.KW_TYPEDEF - 32)) | (1 << (IDLParser.KW_USES - 32)) | (1 << (IDLParser.KW_CUSTOM - 32)) | (1 << (IDLParser.KW_OCTET - 32)) | (1 << (IDLParser.KW_SEQUENCE - 32)) | (1 << (IDLParser.KW_IMPORT - 32)) | (1 << (IDLParser.KW_STRUCT - 32)) | (1 << (IDLParser.KW_NATIVE - 32)) | (1 << (IDLParser.KW_READONLY - 32)) | (1 << (IDLParser.KW_FINDER - 32)) | (1 << (IDLParser.KW_VOID - 32)) | (1 << (IDLParser.KW_PRIVATE - 32)) | (1 << (IDLParser.KW_EVENTTYPE - 32)) | (1 << (IDLParser.KW_WCHAR - 32)) | (1 << (IDLParser.KW_IN - 32)) | (1 << (IDLParser.KW_DEFAULT - 32)) | (1 << (IDLParser.KW_PUBLIC - 32)) | (1 << (IDLParser.KW_SHORT - 32)) | (1 << (IDLParser.KW_LONG - 32)) | (1 << (IDLParser.KW_ENUM - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (IDLParser.KW_WSTRING - 64)) | (1 << (IDLParser.KW_HOME - 64)) | (1 << (IDLParser.KW_FACTORY - 64)) | (1 << (IDLParser.KW_EXCEPTION - 64)) | (1 << (IDLParser.KW_CONST - 64)) | (1 << (IDLParser.KW_VALUEBASE - 64)) | (1 << (IDLParser.KW_VALUETYPE - 64)) | (1 << (IDLParser.KW_MODULE - 64)) | (1 << (IDLParser.KW_OBJECT - 64)) | (1 << (IDLParser.KW_UNSIGNED - 64)) | (1 << (IDLParser.KW_FIXED - 64)) | (1 << (IDLParser.KW_UNION - 64)) | (1 << (IDLParser.KW_ONEWAY - 64)) | (1 << (IDLParser.KW_ANY - 64)) | (1 << (IDLParser.KW_CHAR - 64)) | (1 << (IDLParser.KW_CASE - 64)) | (1 << (IDLParser.KW_FLOAT - 64)) | (1 << (IDLParser.KW_BOOLEAN - 64)) | (1 << (IDLParser.KW_ABSTRACT - 64)) | (1 << (IDLParser.KW_INOUT - 64)) | (1 << (IDLParser.KW_PROVIDES - 64)) | (1 << (IDLParser.KW_CONSUMES - 64)) | (1 << (IDLParser.KW_DOUBLE - 64)) | (1 << (IDLParser.KW_TYPEPREFIX - 64)) | (1 << (IDLParser.KW_TYPEID - 64)) | (1 << (IDLParser.KW_ATTRIBUTE - 64)) | (1 << (IDLParser.KW_LOCAL - 64)))) !== 0) || ((((_la - 97)) & ~0x1F) === 0 && ((1 << (_la - 97)) & ((1 << (IDLParser.KW_INTERFACE - 97)) | (1 << (IDLParser.KW_COMPONENT - 97)) | (1 << (IDLParser.KW_SET - 97)) | (1 << (IDLParser.KW_MAP - 97)) | (1 << (IDLParser.KW_BITFIELD - 97)) | (1 << (IDLParser.KW_BITSET - 97)) | (1 << (IDLParser.KW_BITMASK - 97)) | (1 << (IDLParser.KW_INT8 - 97)) | (1 << (IDLParser.KW_UINT8 - 97)) | (1 << (IDLParser.KW_INT16 - 97)) | (1 << (IDLParser.KW_UINT16 - 97)) | (1 << (IDLParser.KW_INT32 - 97)) | (1 << (IDLParser.KW_UINT32 - 97)) | (1 << (IDLParser.KW_INT64 - 97)) | (1 << (IDLParser.KW_UINT64 - 97)) | (1 << (IDLParser.KW_AT_ANNOTATION - 97)) | (1 << (IDLParser.ID - 97)))) !== 0));
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public bitfield_spec(): Bitfield_specContext {
		let _localctx: Bitfield_specContext = new Bitfield_specContext(this._ctx, this.state);
		this.enterRule(_localctx, 162, IDLParser.RULE_bitfield_spec);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 883;
			this.annapps();
			this.state = 884;
			this.match(IDLParser.KW_BITFIELD);
			this.state = 885;
			this.match(IDLParser.LEFT_ANG_BRACKET);
			this.state = 886;
			this.positive_int_const();
			this.state = 889;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === IDLParser.COMMA) {
				{
				this.state = 887;
				this.match(IDLParser.COMMA);
				this.state = 888;
				this.bitfield_type_spec();
				}
			}

			this.state = 891;
			this.match(IDLParser.RIGHT_ANG_BRACKET);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public bitmask_type(): Bitmask_typeContext {
		let _localctx: Bitmask_typeContext = new Bitmask_typeContext(this._ctx, this.state);
		this.enterRule(_localctx, 164, IDLParser.RULE_bitmask_type);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 893;
			this.match(IDLParser.KW_BITMASK);
			this.state = 894;
			this.identifier();
			this.state = 895;
			this.match(IDLParser.LEFT_BRACE);
			this.state = 896;
			this.bit_values();
			this.state = 897;
			this.match(IDLParser.RIGHT_BRACE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public bit_values(): Bit_valuesContext {
		let _localctx: Bit_valuesContext = new Bit_valuesContext(this._ctx, this.state);
		this.enterRule(_localctx, 166, IDLParser.RULE_bit_values);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 899;
			this.identifier();
			this.state = 904;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === IDLParser.COMMA) {
				{
				{
				this.state = 900;
				this.match(IDLParser.COMMA);
				this.state = 901;
				this.identifier();
				}
				}
				this.state = 906;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public struct_type(): Struct_typeContext {
		let _localctx: Struct_typeContext = new Struct_typeContext(this._ctx, this.state);
		this.enterRule(_localctx, 168, IDLParser.RULE_struct_type);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 907;
			this.match(IDLParser.KW_STRUCT);
			this.state = 908;
			this.identifier();
			this.state = 911;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === IDLParser.COLON) {
				{
				this.state = 909;
				this.match(IDLParser.COLON);
				this.state = 910;
				this.scoped_name();
				}
			}

			this.state = 913;
			this.match(IDLParser.LEFT_BRACE);
			this.state = 914;
			this.member_list();
			this.state = 915;
			this.match(IDLParser.RIGHT_BRACE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public member_list(): Member_listContext {
		let _localctx: Member_listContext = new Member_listContext(this._ctx, this.state);
		this.enterRule(_localctx, 170, IDLParser.RULE_member_list);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 920;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === IDLParser.STRING_LITERAL || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (IDLParser.DOUBLE_COLON - 32)) | (1 << (IDLParser.AT - 32)) | (1 << (IDLParser.KW_OUT - 32)) | (1 << (IDLParser.KW_EMITS - 32)) | (1 << (IDLParser.KW_STRING - 32)) | (1 << (IDLParser.KW_PUBLISHES - 32)) | (1 << (IDLParser.KW_TYPEDEF - 32)) | (1 << (IDLParser.KW_USES - 32)) | (1 << (IDLParser.KW_CUSTOM - 32)) | (1 << (IDLParser.KW_OCTET - 32)) | (1 << (IDLParser.KW_SEQUENCE - 32)) | (1 << (IDLParser.KW_IMPORT - 32)) | (1 << (IDLParser.KW_STRUCT - 32)) | (1 << (IDLParser.KW_NATIVE - 32)) | (1 << (IDLParser.KW_READONLY - 32)) | (1 << (IDLParser.KW_FINDER - 32)) | (1 << (IDLParser.KW_VOID - 32)) | (1 << (IDLParser.KW_PRIVATE - 32)) | (1 << (IDLParser.KW_EVENTTYPE - 32)) | (1 << (IDLParser.KW_WCHAR - 32)) | (1 << (IDLParser.KW_IN - 32)) | (1 << (IDLParser.KW_DEFAULT - 32)) | (1 << (IDLParser.KW_PUBLIC - 32)) | (1 << (IDLParser.KW_SHORT - 32)) | (1 << (IDLParser.KW_LONG - 32)) | (1 << (IDLParser.KW_ENUM - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (IDLParser.KW_WSTRING - 64)) | (1 << (IDLParser.KW_HOME - 64)) | (1 << (IDLParser.KW_FACTORY - 64)) | (1 << (IDLParser.KW_EXCEPTION - 64)) | (1 << (IDLParser.KW_CONST - 64)) | (1 << (IDLParser.KW_VALUEBASE - 64)) | (1 << (IDLParser.KW_VALUETYPE - 64)) | (1 << (IDLParser.KW_MODULE - 64)) | (1 << (IDLParser.KW_OBJECT - 64)) | (1 << (IDLParser.KW_UNSIGNED - 64)) | (1 << (IDLParser.KW_FIXED - 64)) | (1 << (IDLParser.KW_UNION - 64)) | (1 << (IDLParser.KW_ONEWAY - 64)) | (1 << (IDLParser.KW_ANY - 64)) | (1 << (IDLParser.KW_CHAR - 64)) | (1 << (IDLParser.KW_CASE - 64)) | (1 << (IDLParser.KW_FLOAT - 64)) | (1 << (IDLParser.KW_BOOLEAN - 64)) | (1 << (IDLParser.KW_ABSTRACT - 64)) | (1 << (IDLParser.KW_INOUT - 64)) | (1 << (IDLParser.KW_PROVIDES - 64)) | (1 << (IDLParser.KW_CONSUMES - 64)) | (1 << (IDLParser.KW_DOUBLE - 64)) | (1 << (IDLParser.KW_TYPEPREFIX - 64)) | (1 << (IDLParser.KW_TYPEID - 64)) | (1 << (IDLParser.KW_ATTRIBUTE - 64)) | (1 << (IDLParser.KW_LOCAL - 64)))) !== 0) || ((((_la - 97)) & ~0x1F) === 0 && ((1 << (_la - 97)) & ((1 << (IDLParser.KW_INTERFACE - 97)) | (1 << (IDLParser.KW_COMPONENT - 97)) | (1 << (IDLParser.KW_SET - 97)) | (1 << (IDLParser.KW_MAP - 97)) | (1 << (IDLParser.KW_BITFIELD - 97)) | (1 << (IDLParser.KW_BITSET - 97)) | (1 << (IDLParser.KW_BITMASK - 97)) | (1 << (IDLParser.KW_INT8 - 97)) | (1 << (IDLParser.KW_UINT8 - 97)) | (1 << (IDLParser.KW_INT16 - 97)) | (1 << (IDLParser.KW_UINT16 - 97)) | (1 << (IDLParser.KW_INT32 - 97)) | (1 << (IDLParser.KW_UINT32 - 97)) | (1 << (IDLParser.KW_INT64 - 97)) | (1 << (IDLParser.KW_UINT64 - 97)) | (1 << (IDLParser.KW_AT_ANNOTATION - 97)) | (1 << (IDLParser.ID - 97)))) !== 0)) {
				{
				{
				this.state = 917;
				this.member();
				}
				}
				this.state = 922;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public member(): MemberContext {
		let _localctx: MemberContext = new MemberContext(this._ctx, this.state);
		this.enterRule(_localctx, 172, IDLParser.RULE_member);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 923;
			this.annapps();
			this.state = 924;
			this.type_spec();
			this.state = 925;
			this.declarators();
			this.state = 926;
			this.match(IDLParser.SEMICOLON);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public union_type(): Union_typeContext {
		let _localctx: Union_typeContext = new Union_typeContext(this._ctx, this.state);
		this.enterRule(_localctx, 174, IDLParser.RULE_union_type);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 928;
			this.match(IDLParser.KW_UNION);
			this.state = 929;
			this.identifier();
			this.state = 930;
			this.match(IDLParser.KW_SWITCH);
			this.state = 931;
			this.match(IDLParser.LEFT_BRACKET);
			this.state = 932;
			this.annapps();
			this.state = 933;
			this.switch_type_spec();
			this.state = 934;
			this.match(IDLParser.RIGHT_BRACKET);
			this.state = 935;
			this.match(IDLParser.LEFT_BRACE);
			this.state = 936;
			this.switch_body();
			this.state = 937;
			this.match(IDLParser.RIGHT_BRACE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public switch_type_spec(): Switch_type_specContext {
		let _localctx: Switch_type_specContext = new Switch_type_specContext(this._ctx, this.state);
		this.enterRule(_localctx, 176, IDLParser.RULE_switch_type_spec);
		try {
			this.state = 946;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case IDLParser.KW_SHORT:
			case IDLParser.KW_LONG:
			case IDLParser.KW_UNSIGNED:
			case IDLParser.KW_INT8:
			case IDLParser.KW_UINT8:
			case IDLParser.KW_INT16:
			case IDLParser.KW_UINT16:
			case IDLParser.KW_INT32:
			case IDLParser.KW_UINT32:
			case IDLParser.KW_INT64:
			case IDLParser.KW_UINT64:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 939;
				this.integer_type();
				}
				break;
			case IDLParser.KW_CHAR:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 940;
				this.char_type();
				}
				break;
			case IDLParser.KW_WCHAR:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 941;
				this.wide_char_type();
				}
				break;
			case IDLParser.KW_OCTET:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 942;
				this.octet_type();
				}
				break;
			case IDLParser.KW_BOOLEAN:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 943;
				this.boolean_type();
				}
				break;
			case IDLParser.KW_ENUM:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 944;
				this.enum_type();
				}
				break;
			case IDLParser.DOUBLE_COLON:
			case IDLParser.ID:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 945;
				this.scoped_name();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public switch_body(): Switch_bodyContext {
		let _localctx: Switch_bodyContext = new Switch_bodyContext(this._ctx, this.state);
		this.enterRule(_localctx, 178, IDLParser.RULE_switch_body);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 949;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 948;
				this.case_stmt();
				}
				}
				this.state = 951;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la === IDLParser.STRING_LITERAL || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (IDLParser.DOUBLE_COLON - 32)) | (1 << (IDLParser.AT - 32)) | (1 << (IDLParser.KW_OUT - 32)) | (1 << (IDLParser.KW_EMITS - 32)) | (1 << (IDLParser.KW_STRING - 32)) | (1 << (IDLParser.KW_PUBLISHES - 32)) | (1 << (IDLParser.KW_TYPEDEF - 32)) | (1 << (IDLParser.KW_USES - 32)) | (1 << (IDLParser.KW_CUSTOM - 32)) | (1 << (IDLParser.KW_OCTET - 32)) | (1 << (IDLParser.KW_SEQUENCE - 32)) | (1 << (IDLParser.KW_IMPORT - 32)) | (1 << (IDLParser.KW_STRUCT - 32)) | (1 << (IDLParser.KW_NATIVE - 32)) | (1 << (IDLParser.KW_READONLY - 32)) | (1 << (IDLParser.KW_FINDER - 32)) | (1 << (IDLParser.KW_VOID - 32)) | (1 << (IDLParser.KW_PRIVATE - 32)) | (1 << (IDLParser.KW_EVENTTYPE - 32)) | (1 << (IDLParser.KW_WCHAR - 32)) | (1 << (IDLParser.KW_IN - 32)) | (1 << (IDLParser.KW_DEFAULT - 32)) | (1 << (IDLParser.KW_PUBLIC - 32)) | (1 << (IDLParser.KW_SHORT - 32)) | (1 << (IDLParser.KW_LONG - 32)) | (1 << (IDLParser.KW_ENUM - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (IDLParser.KW_WSTRING - 64)) | (1 << (IDLParser.KW_HOME - 64)) | (1 << (IDLParser.KW_FACTORY - 64)) | (1 << (IDLParser.KW_EXCEPTION - 64)) | (1 << (IDLParser.KW_CONST - 64)) | (1 << (IDLParser.KW_VALUEBASE - 64)) | (1 << (IDLParser.KW_VALUETYPE - 64)) | (1 << (IDLParser.KW_MODULE - 64)) | (1 << (IDLParser.KW_OBJECT - 64)) | (1 << (IDLParser.KW_UNSIGNED - 64)) | (1 << (IDLParser.KW_FIXED - 64)) | (1 << (IDLParser.KW_UNION - 64)) | (1 << (IDLParser.KW_ONEWAY - 64)) | (1 << (IDLParser.KW_ANY - 64)) | (1 << (IDLParser.KW_CHAR - 64)) | (1 << (IDLParser.KW_CASE - 64)) | (1 << (IDLParser.KW_FLOAT - 64)) | (1 << (IDLParser.KW_BOOLEAN - 64)) | (1 << (IDLParser.KW_ABSTRACT - 64)) | (1 << (IDLParser.KW_INOUT - 64)) | (1 << (IDLParser.KW_PROVIDES - 64)) | (1 << (IDLParser.KW_CONSUMES - 64)) | (1 << (IDLParser.KW_DOUBLE - 64)) | (1 << (IDLParser.KW_TYPEPREFIX - 64)) | (1 << (IDLParser.KW_TYPEID - 64)) | (1 << (IDLParser.KW_ATTRIBUTE - 64)) | (1 << (IDLParser.KW_LOCAL - 64)))) !== 0) || ((((_la - 97)) & ~0x1F) === 0 && ((1 << (_la - 97)) & ((1 << (IDLParser.KW_INTERFACE - 97)) | (1 << (IDLParser.KW_COMPONENT - 97)) | (1 << (IDLParser.KW_SET - 97)) | (1 << (IDLParser.KW_MAP - 97)) | (1 << (IDLParser.KW_BITFIELD - 97)) | (1 << (IDLParser.KW_BITSET - 97)) | (1 << (IDLParser.KW_BITMASK - 97)) | (1 << (IDLParser.KW_INT8 - 97)) | (1 << (IDLParser.KW_UINT8 - 97)) | (1 << (IDLParser.KW_INT16 - 97)) | (1 << (IDLParser.KW_UINT16 - 97)) | (1 << (IDLParser.KW_INT32 - 97)) | (1 << (IDLParser.KW_UINT32 - 97)) | (1 << (IDLParser.KW_INT64 - 97)) | (1 << (IDLParser.KW_UINT64 - 97)) | (1 << (IDLParser.KW_AT_ANNOTATION - 97)) | (1 << (IDLParser.ID - 97)))) !== 0));
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public case_stmt(): Case_stmtContext {
		let _localctx: Case_stmtContext = new Case_stmtContext(this._ctx, this.state);
		this.enterRule(_localctx, 180, IDLParser.RULE_case_stmt);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 954;
			this._errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					this.state = 953;
					this.case_label();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 956;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 69, this._ctx);
			} while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
			this.state = 958;
			this.element_spec();
			this.state = 959;
			this.match(IDLParser.SEMICOLON);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public case_label(): Case_labelContext {
		let _localctx: Case_labelContext = new Case_labelContext(this._ctx, this.state);
		this.enterRule(_localctx, 182, IDLParser.RULE_case_label);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 961;
			this.annapps();
			this.state = 968;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case IDLParser.KW_CASE:
				{
				this.state = 962;
				this.match(IDLParser.KW_CASE);
				this.state = 963;
				this.const_exp();
				this.state = 964;
				this.match(IDLParser.COLON);
				}
				break;
			case IDLParser.KW_DEFAULT:
				{
				this.state = 966;
				this.match(IDLParser.KW_DEFAULT);
				this.state = 967;
				this.match(IDLParser.COLON);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public element_spec(): Element_specContext {
		let _localctx: Element_specContext = new Element_specContext(this._ctx, this.state);
		this.enterRule(_localctx, 184, IDLParser.RULE_element_spec);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 970;
			this.annapps();
			this.state = 971;
			this.type_spec();
			this.state = 972;
			this.declarator();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public enum_type(): Enum_typeContext {
		let _localctx: Enum_typeContext = new Enum_typeContext(this._ctx, this.state);
		this.enterRule(_localctx, 186, IDLParser.RULE_enum_type);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 974;
			this.match(IDLParser.KW_ENUM);
			this.state = 975;
			this.identifier();
			this.state = 976;
			this.match(IDLParser.LEFT_BRACE);
			this.state = 977;
			this.enumerator();
			this.state = 982;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === IDLParser.COMMA) {
				{
				{
				this.state = 978;
				this.match(IDLParser.COMMA);
				this.state = 979;
				this.enumerator();
				}
				}
				this.state = 984;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 985;
			this.match(IDLParser.RIGHT_BRACE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public enumerator(): EnumeratorContext {
		let _localctx: EnumeratorContext = new EnumeratorContext(this._ctx, this.state);
		this.enterRule(_localctx, 188, IDLParser.RULE_enumerator);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 987;
			this.identifier();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public sequence_type(): Sequence_typeContext {
		let _localctx: Sequence_typeContext = new Sequence_typeContext(this._ctx, this.state);
		this.enterRule(_localctx, 190, IDLParser.RULE_sequence_type);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 989;
			this.match(IDLParser.KW_SEQUENCE);
			this.state = 990;
			this.match(IDLParser.LEFT_ANG_BRACKET);
			this.state = 991;
			this.annapps();
			this.state = 992;
			this.simple_type_spec();
			this.state = 995;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === IDLParser.COMMA) {
				{
				this.state = 993;
				this.match(IDLParser.COMMA);
				this.state = 994;
				this.positive_int_const();
				}
			}

			this.state = 997;
			this.match(IDLParser.RIGHT_ANG_BRACKET);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public set_type(): Set_typeContext {
		let _localctx: Set_typeContext = new Set_typeContext(this._ctx, this.state);
		this.enterRule(_localctx, 192, IDLParser.RULE_set_type);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 999;
			this.match(IDLParser.KW_SET);
			this.state = 1000;
			this.match(IDLParser.LEFT_ANG_BRACKET);
			this.state = 1001;
			this.simple_type_spec();
			this.state = 1004;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === IDLParser.COMMA) {
				{
				this.state = 1002;
				this.match(IDLParser.COMMA);
				this.state = 1003;
				this.positive_int_const();
				}
			}

			this.state = 1006;
			this.match(IDLParser.RIGHT_ANG_BRACKET);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public map_type(): Map_typeContext {
		let _localctx: Map_typeContext = new Map_typeContext(this._ctx, this.state);
		this.enterRule(_localctx, 194, IDLParser.RULE_map_type);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1008;
			this.match(IDLParser.KW_MAP);
			this.state = 1009;
			this.match(IDLParser.LEFT_ANG_BRACKET);
			this.state = 1010;
			this.simple_type_spec();
			this.state = 1011;
			this.match(IDLParser.COMMA);
			this.state = 1012;
			this.simple_type_spec();
			this.state = 1015;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === IDLParser.COMMA) {
				{
				this.state = 1013;
				this.match(IDLParser.COMMA);
				this.state = 1014;
				this.positive_int_const();
				}
			}

			this.state = 1017;
			this.match(IDLParser.RIGHT_ANG_BRACKET);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public string_type(): String_typeContext {
		let _localctx: String_typeContext = new String_typeContext(this._ctx, this.state);
		this.enterRule(_localctx, 196, IDLParser.RULE_string_type);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1019;
			this.match(IDLParser.KW_STRING);
			this.state = 1024;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === IDLParser.LEFT_ANG_BRACKET) {
				{
				this.state = 1020;
				this.match(IDLParser.LEFT_ANG_BRACKET);
				this.state = 1021;
				this.positive_int_const();
				this.state = 1022;
				this.match(IDLParser.RIGHT_ANG_BRACKET);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public wide_string_type(): Wide_string_typeContext {
		let _localctx: Wide_string_typeContext = new Wide_string_typeContext(this._ctx, this.state);
		this.enterRule(_localctx, 198, IDLParser.RULE_wide_string_type);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1026;
			this.match(IDLParser.KW_WSTRING);
			this.state = 1031;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === IDLParser.LEFT_ANG_BRACKET) {
				{
				this.state = 1027;
				this.match(IDLParser.LEFT_ANG_BRACKET);
				this.state = 1028;
				this.positive_int_const();
				this.state = 1029;
				this.match(IDLParser.RIGHT_ANG_BRACKET);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public array_declarator(): Array_declaratorContext {
		let _localctx: Array_declaratorContext = new Array_declaratorContext(this._ctx, this.state);
		this.enterRule(_localctx, 200, IDLParser.RULE_array_declarator);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1033;
			this.match(IDLParser.ID);
			this.state = 1035;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 1034;
				this.fixed_array_size();
				}
				}
				this.state = 1037;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la === IDLParser.LEFT_SQUARE_BRACKET);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public fixed_array_size(): Fixed_array_sizeContext {
		let _localctx: Fixed_array_sizeContext = new Fixed_array_sizeContext(this._ctx, this.state);
		this.enterRule(_localctx, 202, IDLParser.RULE_fixed_array_size);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1039;
			this.match(IDLParser.LEFT_SQUARE_BRACKET);
			this.state = 1040;
			this.positive_int_const();
			this.state = 1041;
			this.match(IDLParser.RIGHT_SQUARE_BRACKET);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public attr_decl(): Attr_declContext {
		let _localctx: Attr_declContext = new Attr_declContext(this._ctx, this.state);
		this.enterRule(_localctx, 204, IDLParser.RULE_attr_decl);
		try {
			this.state = 1045;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case IDLParser.KW_READONLY:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1043;
				this.readonly_attr_spec();
				}
				break;
			case IDLParser.KW_ATTRIBUTE:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1044;
				this.attr_spec();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public except_decl(): Except_declContext {
		let _localctx: Except_declContext = new Except_declContext(this._ctx, this.state);
		this.enterRule(_localctx, 206, IDLParser.RULE_except_decl);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1047;
			this.match(IDLParser.KW_EXCEPTION);
			this.state = 1048;
			this.identifier();
			this.state = 1049;
			this.match(IDLParser.LEFT_BRACE);
			this.state = 1053;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === IDLParser.STRING_LITERAL || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (IDLParser.DOUBLE_COLON - 32)) | (1 << (IDLParser.AT - 32)) | (1 << (IDLParser.KW_OUT - 32)) | (1 << (IDLParser.KW_EMITS - 32)) | (1 << (IDLParser.KW_STRING - 32)) | (1 << (IDLParser.KW_PUBLISHES - 32)) | (1 << (IDLParser.KW_TYPEDEF - 32)) | (1 << (IDLParser.KW_USES - 32)) | (1 << (IDLParser.KW_CUSTOM - 32)) | (1 << (IDLParser.KW_OCTET - 32)) | (1 << (IDLParser.KW_SEQUENCE - 32)) | (1 << (IDLParser.KW_IMPORT - 32)) | (1 << (IDLParser.KW_STRUCT - 32)) | (1 << (IDLParser.KW_NATIVE - 32)) | (1 << (IDLParser.KW_READONLY - 32)) | (1 << (IDLParser.KW_FINDER - 32)) | (1 << (IDLParser.KW_VOID - 32)) | (1 << (IDLParser.KW_PRIVATE - 32)) | (1 << (IDLParser.KW_EVENTTYPE - 32)) | (1 << (IDLParser.KW_WCHAR - 32)) | (1 << (IDLParser.KW_IN - 32)) | (1 << (IDLParser.KW_DEFAULT - 32)) | (1 << (IDLParser.KW_PUBLIC - 32)) | (1 << (IDLParser.KW_SHORT - 32)) | (1 << (IDLParser.KW_LONG - 32)) | (1 << (IDLParser.KW_ENUM - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (IDLParser.KW_WSTRING - 64)) | (1 << (IDLParser.KW_HOME - 64)) | (1 << (IDLParser.KW_FACTORY - 64)) | (1 << (IDLParser.KW_EXCEPTION - 64)) | (1 << (IDLParser.KW_CONST - 64)) | (1 << (IDLParser.KW_VALUEBASE - 64)) | (1 << (IDLParser.KW_VALUETYPE - 64)) | (1 << (IDLParser.KW_MODULE - 64)) | (1 << (IDLParser.KW_OBJECT - 64)) | (1 << (IDLParser.KW_UNSIGNED - 64)) | (1 << (IDLParser.KW_FIXED - 64)) | (1 << (IDLParser.KW_UNION - 64)) | (1 << (IDLParser.KW_ONEWAY - 64)) | (1 << (IDLParser.KW_ANY - 64)) | (1 << (IDLParser.KW_CHAR - 64)) | (1 << (IDLParser.KW_CASE - 64)) | (1 << (IDLParser.KW_FLOAT - 64)) | (1 << (IDLParser.KW_BOOLEAN - 64)) | (1 << (IDLParser.KW_ABSTRACT - 64)) | (1 << (IDLParser.KW_INOUT - 64)) | (1 << (IDLParser.KW_PROVIDES - 64)) | (1 << (IDLParser.KW_CONSUMES - 64)) | (1 << (IDLParser.KW_DOUBLE - 64)) | (1 << (IDLParser.KW_TYPEPREFIX - 64)) | (1 << (IDLParser.KW_TYPEID - 64)) | (1 << (IDLParser.KW_ATTRIBUTE - 64)) | (1 << (IDLParser.KW_LOCAL - 64)))) !== 0) || ((((_la - 97)) & ~0x1F) === 0 && ((1 << (_la - 97)) & ((1 << (IDLParser.KW_INTERFACE - 97)) | (1 << (IDLParser.KW_COMPONENT - 97)) | (1 << (IDLParser.KW_SET - 97)) | (1 << (IDLParser.KW_MAP - 97)) | (1 << (IDLParser.KW_BITFIELD - 97)) | (1 << (IDLParser.KW_BITSET - 97)) | (1 << (IDLParser.KW_BITMASK - 97)) | (1 << (IDLParser.KW_INT8 - 97)) | (1 << (IDLParser.KW_UINT8 - 97)) | (1 << (IDLParser.KW_INT16 - 97)) | (1 << (IDLParser.KW_UINT16 - 97)) | (1 << (IDLParser.KW_INT32 - 97)) | (1 << (IDLParser.KW_UINT32 - 97)) | (1 << (IDLParser.KW_INT64 - 97)) | (1 << (IDLParser.KW_UINT64 - 97)) | (1 << (IDLParser.KW_AT_ANNOTATION - 97)) | (1 << (IDLParser.ID - 97)))) !== 0)) {
				{
				{
				this.state = 1050;
				this.member();
				}
				}
				this.state = 1055;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 1056;
			this.match(IDLParser.RIGHT_BRACE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public op_decl(): Op_declContext {
		let _localctx: Op_declContext = new Op_declContext(this._ctx, this.state);
		this.enterRule(_localctx, 208, IDLParser.RULE_op_decl);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1059;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 80, this._ctx) ) {
			case 1:
				{
				this.state = 1058;
				this.op_attribute();
				}
				break;
			}
			this.state = 1061;
			this.op_type_spec();
			this.state = 1062;
			this.identifier();
			this.state = 1063;
			this.parameter_decls();
			this.state = 1065;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === IDLParser.KW_RAISES) {
				{
				this.state = 1064;
				this.raises_expr();
				}
			}

			this.state = 1068;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === IDLParser.KW_CONTEXT) {
				{
				this.state = 1067;
				this.context_expr();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public op_attribute(): Op_attributeContext {
		let _localctx: Op_attributeContext = new Op_attributeContext(this._ctx, this.state);
		this.enterRule(_localctx, 210, IDLParser.RULE_op_attribute);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1070;
			this.match(IDLParser.KW_ONEWAY);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public op_type_spec(): Op_type_specContext {
		let _localctx: Op_type_specContext = new Op_type_specContext(this._ctx, this.state);
		this.enterRule(_localctx, 212, IDLParser.RULE_op_type_spec);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1072;
			this.annapps();
			this.state = 1075;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case IDLParser.DOUBLE_COLON:
			case IDLParser.KW_STRING:
			case IDLParser.KW_OCTET:
			case IDLParser.KW_WCHAR:
			case IDLParser.KW_SHORT:
			case IDLParser.KW_LONG:
			case IDLParser.KW_WSTRING:
			case IDLParser.KW_VALUEBASE:
			case IDLParser.KW_OBJECT:
			case IDLParser.KW_UNSIGNED:
			case IDLParser.KW_ANY:
			case IDLParser.KW_CHAR:
			case IDLParser.KW_FLOAT:
			case IDLParser.KW_BOOLEAN:
			case IDLParser.KW_DOUBLE:
			case IDLParser.KW_INT8:
			case IDLParser.KW_UINT8:
			case IDLParser.KW_INT16:
			case IDLParser.KW_UINT16:
			case IDLParser.KW_INT32:
			case IDLParser.KW_UINT32:
			case IDLParser.KW_INT64:
			case IDLParser.KW_UINT64:
			case IDLParser.ID:
				{
				this.state = 1073;
				this.param_type_spec();
				}
				break;
			case IDLParser.KW_VOID:
				{
				this.state = 1074;
				this.match(IDLParser.KW_VOID);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public parameter_decls(): Parameter_declsContext {
		let _localctx: Parameter_declsContext = new Parameter_declsContext(this._ctx, this.state);
		this.enterRule(_localctx, 214, IDLParser.RULE_parameter_decls);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1077;
			this.match(IDLParser.LEFT_BRACKET);
			this.state = 1086;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === IDLParser.STRING_LITERAL || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (IDLParser.DOUBLE_COLON - 32)) | (1 << (IDLParser.AT - 32)) | (1 << (IDLParser.KW_OUT - 32)) | (1 << (IDLParser.KW_EMITS - 32)) | (1 << (IDLParser.KW_STRING - 32)) | (1 << (IDLParser.KW_PUBLISHES - 32)) | (1 << (IDLParser.KW_TYPEDEF - 32)) | (1 << (IDLParser.KW_USES - 32)) | (1 << (IDLParser.KW_CUSTOM - 32)) | (1 << (IDLParser.KW_OCTET - 32)) | (1 << (IDLParser.KW_SEQUENCE - 32)) | (1 << (IDLParser.KW_IMPORT - 32)) | (1 << (IDLParser.KW_STRUCT - 32)) | (1 << (IDLParser.KW_NATIVE - 32)) | (1 << (IDLParser.KW_READONLY - 32)) | (1 << (IDLParser.KW_FINDER - 32)) | (1 << (IDLParser.KW_VOID - 32)) | (1 << (IDLParser.KW_PRIVATE - 32)) | (1 << (IDLParser.KW_EVENTTYPE - 32)) | (1 << (IDLParser.KW_WCHAR - 32)) | (1 << (IDLParser.KW_IN - 32)) | (1 << (IDLParser.KW_DEFAULT - 32)) | (1 << (IDLParser.KW_PUBLIC - 32)) | (1 << (IDLParser.KW_SHORT - 32)) | (1 << (IDLParser.KW_LONG - 32)) | (1 << (IDLParser.KW_ENUM - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (IDLParser.KW_WSTRING - 64)) | (1 << (IDLParser.KW_HOME - 64)) | (1 << (IDLParser.KW_FACTORY - 64)) | (1 << (IDLParser.KW_EXCEPTION - 64)) | (1 << (IDLParser.KW_CONST - 64)) | (1 << (IDLParser.KW_VALUEBASE - 64)) | (1 << (IDLParser.KW_VALUETYPE - 64)) | (1 << (IDLParser.KW_MODULE - 64)) | (1 << (IDLParser.KW_OBJECT - 64)) | (1 << (IDLParser.KW_UNSIGNED - 64)) | (1 << (IDLParser.KW_FIXED - 64)) | (1 << (IDLParser.KW_UNION - 64)) | (1 << (IDLParser.KW_ONEWAY - 64)) | (1 << (IDLParser.KW_ANY - 64)) | (1 << (IDLParser.KW_CHAR - 64)) | (1 << (IDLParser.KW_CASE - 64)) | (1 << (IDLParser.KW_FLOAT - 64)) | (1 << (IDLParser.KW_BOOLEAN - 64)) | (1 << (IDLParser.KW_ABSTRACT - 64)) | (1 << (IDLParser.KW_INOUT - 64)) | (1 << (IDLParser.KW_PROVIDES - 64)) | (1 << (IDLParser.KW_CONSUMES - 64)) | (1 << (IDLParser.KW_DOUBLE - 64)) | (1 << (IDLParser.KW_TYPEPREFIX - 64)) | (1 << (IDLParser.KW_TYPEID - 64)) | (1 << (IDLParser.KW_ATTRIBUTE - 64)) | (1 << (IDLParser.KW_LOCAL - 64)))) !== 0) || ((((_la - 97)) & ~0x1F) === 0 && ((1 << (_la - 97)) & ((1 << (IDLParser.KW_INTERFACE - 97)) | (1 << (IDLParser.KW_COMPONENT - 97)) | (1 << (IDLParser.KW_SET - 97)) | (1 << (IDLParser.KW_MAP - 97)) | (1 << (IDLParser.KW_BITFIELD - 97)) | (1 << (IDLParser.KW_BITSET - 97)) | (1 << (IDLParser.KW_BITMASK - 97)) | (1 << (IDLParser.KW_INT8 - 97)) | (1 << (IDLParser.KW_UINT8 - 97)) | (1 << (IDLParser.KW_INT16 - 97)) | (1 << (IDLParser.KW_UINT16 - 97)) | (1 << (IDLParser.KW_INT32 - 97)) | (1 << (IDLParser.KW_UINT32 - 97)) | (1 << (IDLParser.KW_INT64 - 97)) | (1 << (IDLParser.KW_UINT64 - 97)) | (1 << (IDLParser.KW_AT_ANNOTATION - 97)) | (1 << (IDLParser.ID - 97)))) !== 0)) {
				{
				this.state = 1078;
				this.param_decl();
				this.state = 1083;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === IDLParser.COMMA) {
					{
					{
					this.state = 1079;
					this.match(IDLParser.COMMA);
					this.state = 1080;
					this.param_decl();
					}
					}
					this.state = 1085;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
			}

			this.state = 1088;
			this.match(IDLParser.RIGHT_BRACKET);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public param_decl(): Param_declContext {
		let _localctx: Param_declContext = new Param_declContext(this._ctx, this.state);
		this.enterRule(_localctx, 216, IDLParser.RULE_param_decl);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1090;
			this.annapps();
			this.state = 1091;
			this.param_attribute();
			this.state = 1092;
			this.annapps();
			this.state = 1093;
			this.param_type_spec();
			this.state = 1094;
			this.annapps();
			this.state = 1095;
			this.simple_declarator();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public param_attribute(): Param_attributeContext {
		let _localctx: Param_attributeContext = new Param_attributeContext(this._ctx, this.state);
		this.enterRule(_localctx, 218, IDLParser.RULE_param_attribute);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1097;
			_la = this._input.LA(1);
			if (!(_la === IDLParser.KW_OUT || _la === IDLParser.KW_IN || _la === IDLParser.KW_INOUT)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public raises_expr(): Raises_exprContext {
		let _localctx: Raises_exprContext = new Raises_exprContext(this._ctx, this.state);
		this.enterRule(_localctx, 220, IDLParser.RULE_raises_expr);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1099;
			this.match(IDLParser.KW_RAISES);
			this.state = 1100;
			this.match(IDLParser.LEFT_BRACKET);
			this.state = 1101;
			this.a_scoped_name();
			this.state = 1106;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === IDLParser.COMMA) {
				{
				{
				this.state = 1102;
				this.match(IDLParser.COMMA);
				this.state = 1103;
				this.a_scoped_name();
				}
				}
				this.state = 1108;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 1109;
			this.match(IDLParser.RIGHT_BRACKET);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public context_expr(): Context_exprContext {
		let _localctx: Context_exprContext = new Context_exprContext(this._ctx, this.state);
		this.enterRule(_localctx, 222, IDLParser.RULE_context_expr);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1111;
			this.match(IDLParser.KW_CONTEXT);
			this.state = 1112;
			this.match(IDLParser.LEFT_BRACKET);
			this.state = 1113;
			this.match(IDLParser.STRING_LITERAL);
			this.state = 1118;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === IDLParser.COMMA) {
				{
				{
				this.state = 1114;
				this.match(IDLParser.COMMA);
				this.state = 1115;
				this.match(IDLParser.STRING_LITERAL);
				}
				}
				this.state = 1120;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 1121;
			this.match(IDLParser.RIGHT_BRACKET);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public param_type_spec(): Param_type_specContext {
		let _localctx: Param_type_specContext = new Param_type_specContext(this._ctx, this.state);
		this.enterRule(_localctx, 224, IDLParser.RULE_param_type_spec);
		try {
			this.state = 1127;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case IDLParser.KW_OCTET:
			case IDLParser.KW_WCHAR:
			case IDLParser.KW_SHORT:
			case IDLParser.KW_LONG:
			case IDLParser.KW_VALUEBASE:
			case IDLParser.KW_OBJECT:
			case IDLParser.KW_UNSIGNED:
			case IDLParser.KW_ANY:
			case IDLParser.KW_CHAR:
			case IDLParser.KW_FLOAT:
			case IDLParser.KW_BOOLEAN:
			case IDLParser.KW_DOUBLE:
			case IDLParser.KW_INT8:
			case IDLParser.KW_UINT8:
			case IDLParser.KW_INT16:
			case IDLParser.KW_UINT16:
			case IDLParser.KW_INT32:
			case IDLParser.KW_UINT32:
			case IDLParser.KW_INT64:
			case IDLParser.KW_UINT64:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1123;
				this.base_type_spec();
				}
				break;
			case IDLParser.KW_STRING:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1124;
				this.string_type();
				}
				break;
			case IDLParser.KW_WSTRING:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 1125;
				this.wide_string_type();
				}
				break;
			case IDLParser.DOUBLE_COLON:
			case IDLParser.ID:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 1126;
				this.scoped_name();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public fixed_pt_type(): Fixed_pt_typeContext {
		let _localctx: Fixed_pt_typeContext = new Fixed_pt_typeContext(this._ctx, this.state);
		this.enterRule(_localctx, 226, IDLParser.RULE_fixed_pt_type);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1129;
			this.match(IDLParser.KW_FIXED);
			this.state = 1130;
			this.match(IDLParser.LEFT_ANG_BRACKET);
			this.state = 1131;
			this.positive_int_const();
			this.state = 1132;
			this.match(IDLParser.COMMA);
			this.state = 1133;
			this.positive_int_const();
			this.state = 1134;
			this.match(IDLParser.RIGHT_ANG_BRACKET);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public fixed_pt_const_type(): Fixed_pt_const_typeContext {
		let _localctx: Fixed_pt_const_typeContext = new Fixed_pt_const_typeContext(this._ctx, this.state);
		this.enterRule(_localctx, 228, IDLParser.RULE_fixed_pt_const_type);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1136;
			this.match(IDLParser.KW_FIXED);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public value_base_type(): Value_base_typeContext {
		let _localctx: Value_base_typeContext = new Value_base_typeContext(this._ctx, this.state);
		this.enterRule(_localctx, 230, IDLParser.RULE_value_base_type);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1138;
			this.match(IDLParser.KW_VALUEBASE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public constr_forward_decl(): Constr_forward_declContext {
		let _localctx: Constr_forward_declContext = new Constr_forward_declContext(this._ctx, this.state);
		this.enterRule(_localctx, 232, IDLParser.RULE_constr_forward_decl);
		try {
			this.state = 1144;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case IDLParser.KW_STRUCT:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1140;
				this.match(IDLParser.KW_STRUCT);
				this.state = 1141;
				this.match(IDLParser.ID);
				}
				break;
			case IDLParser.KW_UNION:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1142;
				this.match(IDLParser.KW_UNION);
				this.state = 1143;
				this.match(IDLParser.ID);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public import_decl(): Import_declContext {
		let _localctx: Import_declContext = new Import_declContext(this._ctx, this.state);
		this.enterRule(_localctx, 234, IDLParser.RULE_import_decl);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1146;
			this.annapps();
			this.state = 1147;
			this.match(IDLParser.KW_IMPORT);
			this.state = 1148;
			this.annapps();
			this.state = 1149;
			this.imported_scope();
			this.state = 1150;
			this.match(IDLParser.SEMICOLON);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public imported_scope(): Imported_scopeContext {
		let _localctx: Imported_scopeContext = new Imported_scopeContext(this._ctx, this.state);
		this.enterRule(_localctx, 236, IDLParser.RULE_imported_scope);
		try {
			this.state = 1154;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case IDLParser.DOUBLE_COLON:
			case IDLParser.ID:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1152;
				this.scoped_name();
				}
				break;
			case IDLParser.STRING_LITERAL:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1153;
				this.match(IDLParser.STRING_LITERAL);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public type_id_decl(): Type_id_declContext {
		let _localctx: Type_id_declContext = new Type_id_declContext(this._ctx, this.state);
		this.enterRule(_localctx, 238, IDLParser.RULE_type_id_decl);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1156;
			this.match(IDLParser.KW_TYPEID);
			this.state = 1157;
			this.a_scoped_name();
			this.state = 1158;
			this.match(IDLParser.STRING_LITERAL);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public type_prefix_decl(): Type_prefix_declContext {
		let _localctx: Type_prefix_declContext = new Type_prefix_declContext(this._ctx, this.state);
		this.enterRule(_localctx, 240, IDLParser.RULE_type_prefix_decl);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1160;
			this.match(IDLParser.KW_TYPEPREFIX);
			this.state = 1161;
			this.a_scoped_name();
			this.state = 1162;
			this.match(IDLParser.STRING_LITERAL);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public readonly_attr_spec(): Readonly_attr_specContext {
		let _localctx: Readonly_attr_specContext = new Readonly_attr_specContext(this._ctx, this.state);
		this.enterRule(_localctx, 242, IDLParser.RULE_readonly_attr_spec);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1164;
			this.match(IDLParser.KW_READONLY);
			this.state = 1165;
			this.match(IDLParser.KW_ATTRIBUTE);
			this.state = 1166;
			this.annapps();
			this.state = 1167;
			this.param_type_spec();
			this.state = 1168;
			this.readonly_attr_declarator();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public readonly_attr_declarator(): Readonly_attr_declaratorContext {
		let _localctx: Readonly_attr_declaratorContext = new Readonly_attr_declaratorContext(this._ctx, this.state);
		this.enterRule(_localctx, 244, IDLParser.RULE_readonly_attr_declarator);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1170;
			this.annapps();
			this.state = 1171;
			this.simple_declarator();
			this.state = 1182;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case IDLParser.KW_RAISES:
				{
				this.state = 1172;
				this.raises_expr();
				}
				break;
			case IDLParser.SEMICOLON:
			case IDLParser.COMMA:
				{
				this.state = 1179;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === IDLParser.COMMA) {
					{
					{
					this.state = 1173;
					this.match(IDLParser.COMMA);
					this.state = 1174;
					this.annapps();
					this.state = 1175;
					this.simple_declarator();
					}
					}
					this.state = 1181;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public attr_spec(): Attr_specContext {
		let _localctx: Attr_specContext = new Attr_specContext(this._ctx, this.state);
		this.enterRule(_localctx, 246, IDLParser.RULE_attr_spec);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1184;
			this.match(IDLParser.KW_ATTRIBUTE);
			this.state = 1185;
			this.annapps();
			this.state = 1186;
			this.param_type_spec();
			this.state = 1187;
			this.attr_declarator();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public attr_declarator(): Attr_declaratorContext {
		let _localctx: Attr_declaratorContext = new Attr_declaratorContext(this._ctx, this.state);
		this.enterRule(_localctx, 248, IDLParser.RULE_attr_declarator);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1189;
			this.annapps();
			this.state = 1190;
			this.simple_declarator();
			this.state = 1201;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case IDLParser.KW_SETRAISES:
			case IDLParser.KW_GETRAISES:
				{
				this.state = 1191;
				this.attr_raises_expr();
				}
				break;
			case IDLParser.SEMICOLON:
			case IDLParser.COMMA:
				{
				this.state = 1198;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === IDLParser.COMMA) {
					{
					{
					this.state = 1192;
					this.match(IDLParser.COMMA);
					this.state = 1193;
					this.annapps();
					this.state = 1194;
					this.simple_declarator();
					}
					}
					this.state = 1200;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public attr_raises_expr(): Attr_raises_exprContext {
		let _localctx: Attr_raises_exprContext = new Attr_raises_exprContext(this._ctx, this.state);
		this.enterRule(_localctx, 250, IDLParser.RULE_attr_raises_expr);
		let _la: number;
		try {
			this.state = 1208;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case IDLParser.KW_GETRAISES:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1203;
				this.get_excep_expr();
				this.state = 1205;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === IDLParser.KW_SETRAISES) {
					{
					this.state = 1204;
					this.set_excep_expr();
					}
				}

				}
				break;
			case IDLParser.KW_SETRAISES:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1207;
				this.set_excep_expr();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public get_excep_expr(): Get_excep_exprContext {
		let _localctx: Get_excep_exprContext = new Get_excep_exprContext(this._ctx, this.state);
		this.enterRule(_localctx, 252, IDLParser.RULE_get_excep_expr);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1210;
			this.match(IDLParser.KW_GETRAISES);
			this.state = 1211;
			this.exception_list();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public set_excep_expr(): Set_excep_exprContext {
		let _localctx: Set_excep_exprContext = new Set_excep_exprContext(this._ctx, this.state);
		this.enterRule(_localctx, 254, IDLParser.RULE_set_excep_expr);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1213;
			this.match(IDLParser.KW_SETRAISES);
			this.state = 1214;
			this.exception_list();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public exception_list(): Exception_listContext {
		let _localctx: Exception_listContext = new Exception_listContext(this._ctx, this.state);
		this.enterRule(_localctx, 256, IDLParser.RULE_exception_list);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1216;
			this.match(IDLParser.LEFT_BRACKET);
			this.state = 1217;
			this.a_scoped_name();
			this.state = 1222;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === IDLParser.COMMA) {
				{
				{
				this.state = 1218;
				this.match(IDLParser.COMMA);
				this.state = 1219;
				this.a_scoped_name();
				}
				}
				this.state = 1224;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 1225;
			this.match(IDLParser.RIGHT_BRACKET);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public component(): ComponentContext {
		let _localctx: ComponentContext = new ComponentContext(this._ctx, this.state);
		this.enterRule(_localctx, 258, IDLParser.RULE_component);
		try {
			this.state = 1229;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 98, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1227;
				this.component_decl();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1228;
				this.component_forward_decl();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public component_forward_decl(): Component_forward_declContext {
		let _localctx: Component_forward_declContext = new Component_forward_declContext(this._ctx, this.state);
		this.enterRule(_localctx, 260, IDLParser.RULE_component_forward_decl);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1231;
			this.match(IDLParser.KW_COMPONENT);
			this.state = 1232;
			this.match(IDLParser.ID);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public component_decl(): Component_declContext {
		let _localctx: Component_declContext = new Component_declContext(this._ctx, this.state);
		this.enterRule(_localctx, 262, IDLParser.RULE_component_decl);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1234;
			this.component_header();
			this.state = 1235;
			this.match(IDLParser.LEFT_BRACE);
			this.state = 1236;
			this.component_body();
			this.state = 1237;
			this.match(IDLParser.RIGHT_BRACE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public component_header(): Component_headerContext {
		let _localctx: Component_headerContext = new Component_headerContext(this._ctx, this.state);
		this.enterRule(_localctx, 264, IDLParser.RULE_component_header);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1239;
			this.match(IDLParser.KW_COMPONENT);
			this.state = 1240;
			this.identifier();
			this.state = 1242;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === IDLParser.COLON) {
				{
				this.state = 1241;
				this.component_inheritance_spec();
				}
			}

			this.state = 1245;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === IDLParser.KW_SUPPORTS) {
				{
				this.state = 1244;
				this.supported_interface_spec();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public supported_interface_spec(): Supported_interface_specContext {
		let _localctx: Supported_interface_specContext = new Supported_interface_specContext(this._ctx, this.state);
		this.enterRule(_localctx, 266, IDLParser.RULE_supported_interface_spec);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1247;
			this.match(IDLParser.KW_SUPPORTS);
			this.state = 1248;
			this.a_scoped_name();
			this.state = 1253;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === IDLParser.COMMA) {
				{
				{
				this.state = 1249;
				this.match(IDLParser.COMMA);
				this.state = 1250;
				this.a_scoped_name();
				}
				}
				this.state = 1255;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public component_inheritance_spec(): Component_inheritance_specContext {
		let _localctx: Component_inheritance_specContext = new Component_inheritance_specContext(this._ctx, this.state);
		this.enterRule(_localctx, 268, IDLParser.RULE_component_inheritance_spec);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1256;
			this.match(IDLParser.COLON);
			this.state = 1257;
			this.a_scoped_name();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public component_body(): Component_bodyContext {
		let _localctx: Component_bodyContext = new Component_bodyContext(this._ctx, this.state);
		this.enterRule(_localctx, 270, IDLParser.RULE_component_body);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1262;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === IDLParser.STRING_LITERAL || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (IDLParser.DOUBLE_COLON - 32)) | (1 << (IDLParser.AT - 32)) | (1 << (IDLParser.KW_OUT - 32)) | (1 << (IDLParser.KW_EMITS - 32)) | (1 << (IDLParser.KW_STRING - 32)) | (1 << (IDLParser.KW_PUBLISHES - 32)) | (1 << (IDLParser.KW_TYPEDEF - 32)) | (1 << (IDLParser.KW_USES - 32)) | (1 << (IDLParser.KW_CUSTOM - 32)) | (1 << (IDLParser.KW_OCTET - 32)) | (1 << (IDLParser.KW_SEQUENCE - 32)) | (1 << (IDLParser.KW_IMPORT - 32)) | (1 << (IDLParser.KW_STRUCT - 32)) | (1 << (IDLParser.KW_NATIVE - 32)) | (1 << (IDLParser.KW_READONLY - 32)) | (1 << (IDLParser.KW_FINDER - 32)) | (1 << (IDLParser.KW_VOID - 32)) | (1 << (IDLParser.KW_PRIVATE - 32)) | (1 << (IDLParser.KW_EVENTTYPE - 32)) | (1 << (IDLParser.KW_WCHAR - 32)) | (1 << (IDLParser.KW_IN - 32)) | (1 << (IDLParser.KW_DEFAULT - 32)) | (1 << (IDLParser.KW_PUBLIC - 32)) | (1 << (IDLParser.KW_SHORT - 32)) | (1 << (IDLParser.KW_LONG - 32)) | (1 << (IDLParser.KW_ENUM - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (IDLParser.KW_WSTRING - 64)) | (1 << (IDLParser.KW_HOME - 64)) | (1 << (IDLParser.KW_FACTORY - 64)) | (1 << (IDLParser.KW_EXCEPTION - 64)) | (1 << (IDLParser.KW_CONST - 64)) | (1 << (IDLParser.KW_VALUEBASE - 64)) | (1 << (IDLParser.KW_VALUETYPE - 64)) | (1 << (IDLParser.KW_MODULE - 64)) | (1 << (IDLParser.KW_OBJECT - 64)) | (1 << (IDLParser.KW_UNSIGNED - 64)) | (1 << (IDLParser.KW_FIXED - 64)) | (1 << (IDLParser.KW_UNION - 64)) | (1 << (IDLParser.KW_ONEWAY - 64)) | (1 << (IDLParser.KW_ANY - 64)) | (1 << (IDLParser.KW_CHAR - 64)) | (1 << (IDLParser.KW_CASE - 64)) | (1 << (IDLParser.KW_FLOAT - 64)) | (1 << (IDLParser.KW_BOOLEAN - 64)) | (1 << (IDLParser.KW_ABSTRACT - 64)) | (1 << (IDLParser.KW_INOUT - 64)) | (1 << (IDLParser.KW_PROVIDES - 64)) | (1 << (IDLParser.KW_CONSUMES - 64)) | (1 << (IDLParser.KW_DOUBLE - 64)) | (1 << (IDLParser.KW_TYPEPREFIX - 64)) | (1 << (IDLParser.KW_TYPEID - 64)) | (1 << (IDLParser.KW_ATTRIBUTE - 64)) | (1 << (IDLParser.KW_LOCAL - 64)))) !== 0) || ((((_la - 97)) & ~0x1F) === 0 && ((1 << (_la - 97)) & ((1 << (IDLParser.KW_INTERFACE - 97)) | (1 << (IDLParser.KW_COMPONENT - 97)) | (1 << (IDLParser.KW_SET - 97)) | (1 << (IDLParser.KW_MAP - 97)) | (1 << (IDLParser.KW_BITFIELD - 97)) | (1 << (IDLParser.KW_BITSET - 97)) | (1 << (IDLParser.KW_BITMASK - 97)) | (1 << (IDLParser.KW_INT8 - 97)) | (1 << (IDLParser.KW_UINT8 - 97)) | (1 << (IDLParser.KW_INT16 - 97)) | (1 << (IDLParser.KW_UINT16 - 97)) | (1 << (IDLParser.KW_INT32 - 97)) | (1 << (IDLParser.KW_UINT32 - 97)) | (1 << (IDLParser.KW_INT64 - 97)) | (1 << (IDLParser.KW_UINT64 - 97)) | (1 << (IDLParser.KW_AT_ANNOTATION - 97)) | (1 << (IDLParser.ID - 97)))) !== 0)) {
				{
				{
				this.state = 1259;
				this.component_export();
				}
				}
				this.state = 1264;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public component_export(): Component_exportContext {
		let _localctx: Component_exportContext = new Component_exportContext(this._ctx, this.state);
		this.enterRule(_localctx, 272, IDLParser.RULE_component_export);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1265;
			this.annapps();
			this.state = 1284;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case IDLParser.KW_PROVIDES:
				{
				this.state = 1266;
				this.provides_decl();
				this.state = 1267;
				this.match(IDLParser.SEMICOLON);
				}
				break;
			case IDLParser.KW_USES:
				{
				this.state = 1269;
				this.uses_decl();
				this.state = 1270;
				this.match(IDLParser.SEMICOLON);
				}
				break;
			case IDLParser.KW_EMITS:
				{
				this.state = 1272;
				this.emits_decl();
				this.state = 1273;
				this.match(IDLParser.SEMICOLON);
				}
				break;
			case IDLParser.KW_PUBLISHES:
				{
				this.state = 1275;
				this.publishes_decl();
				this.state = 1276;
				this.match(IDLParser.SEMICOLON);
				}
				break;
			case IDLParser.KW_CONSUMES:
				{
				this.state = 1278;
				this.consumes_decl();
				this.state = 1279;
				this.match(IDLParser.SEMICOLON);
				}
				break;
			case IDLParser.KW_READONLY:
			case IDLParser.KW_ATTRIBUTE:
				{
				this.state = 1281;
				this.attr_decl();
				this.state = 1282;
				this.match(IDLParser.SEMICOLON);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public provides_decl(): Provides_declContext {
		let _localctx: Provides_declContext = new Provides_declContext(this._ctx, this.state);
		this.enterRule(_localctx, 274, IDLParser.RULE_provides_decl);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1286;
			this.match(IDLParser.KW_PROVIDES);
			this.state = 1287;
			this.interface_type();
			this.state = 1288;
			this.match(IDLParser.ID);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public interface_type(): Interface_typeContext {
		let _localctx: Interface_typeContext = new Interface_typeContext(this._ctx, this.state);
		this.enterRule(_localctx, 276, IDLParser.RULE_interface_type);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1290;
			this.annapps();
			this.state = 1293;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case IDLParser.DOUBLE_COLON:
			case IDLParser.ID:
				{
				this.state = 1291;
				this.scoped_name();
				}
				break;
			case IDLParser.KW_OBJECT:
				{
				this.state = 1292;
				this.match(IDLParser.KW_OBJECT);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public uses_decl(): Uses_declContext {
		let _localctx: Uses_declContext = new Uses_declContext(this._ctx, this.state);
		this.enterRule(_localctx, 278, IDLParser.RULE_uses_decl);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1295;
			this.match(IDLParser.KW_USES);
			this.state = 1297;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === IDLParser.KW_MULTIPLE) {
				{
				this.state = 1296;
				this.match(IDLParser.KW_MULTIPLE);
				}
			}

			this.state = 1299;
			this.interface_type();
			this.state = 1300;
			this.match(IDLParser.ID);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public emits_decl(): Emits_declContext {
		let _localctx: Emits_declContext = new Emits_declContext(this._ctx, this.state);
		this.enterRule(_localctx, 280, IDLParser.RULE_emits_decl);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1302;
			this.match(IDLParser.KW_EMITS);
			this.state = 1303;
			this.a_scoped_name();
			this.state = 1304;
			this.match(IDLParser.ID);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public publishes_decl(): Publishes_declContext {
		let _localctx: Publishes_declContext = new Publishes_declContext(this._ctx, this.state);
		this.enterRule(_localctx, 282, IDLParser.RULE_publishes_decl);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1306;
			this.match(IDLParser.KW_PUBLISHES);
			this.state = 1307;
			this.a_scoped_name();
			this.state = 1308;
			this.match(IDLParser.ID);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public consumes_decl(): Consumes_declContext {
		let _localctx: Consumes_declContext = new Consumes_declContext(this._ctx, this.state);
		this.enterRule(_localctx, 284, IDLParser.RULE_consumes_decl);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1310;
			this.match(IDLParser.KW_CONSUMES);
			this.state = 1311;
			this.a_scoped_name();
			this.state = 1312;
			this.match(IDLParser.ID);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public home_decl(): Home_declContext {
		let _localctx: Home_declContext = new Home_declContext(this._ctx, this.state);
		this.enterRule(_localctx, 286, IDLParser.RULE_home_decl);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1314;
			this.home_header();
			this.state = 1315;
			this.home_body();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public home_header(): Home_headerContext {
		let _localctx: Home_headerContext = new Home_headerContext(this._ctx, this.state);
		this.enterRule(_localctx, 288, IDLParser.RULE_home_header);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1317;
			this.match(IDLParser.KW_HOME);
			this.state = 1318;
			this.identifier();
			this.state = 1320;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === IDLParser.COLON) {
				{
				this.state = 1319;
				this.home_inheritance_spec();
				}
			}

			this.state = 1323;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === IDLParser.KW_SUPPORTS) {
				{
				this.state = 1322;
				this.supported_interface_spec();
				}
			}

			this.state = 1325;
			this.match(IDLParser.KW_MANAGES);
			this.state = 1326;
			this.a_scoped_name();
			this.state = 1328;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === IDLParser.KW_PRIMARYKEY) {
				{
				this.state = 1327;
				this.primary_key_spec();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public home_inheritance_spec(): Home_inheritance_specContext {
		let _localctx: Home_inheritance_specContext = new Home_inheritance_specContext(this._ctx, this.state);
		this.enterRule(_localctx, 290, IDLParser.RULE_home_inheritance_spec);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1330;
			this.match(IDLParser.COLON);
			this.state = 1331;
			this.a_scoped_name();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public primary_key_spec(): Primary_key_specContext {
		let _localctx: Primary_key_specContext = new Primary_key_specContext(this._ctx, this.state);
		this.enterRule(_localctx, 292, IDLParser.RULE_primary_key_spec);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1333;
			this.match(IDLParser.KW_PRIMARYKEY);
			this.state = 1334;
			this.a_scoped_name();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public home_body(): Home_bodyContext {
		let _localctx: Home_bodyContext = new Home_bodyContext(this._ctx, this.state);
		this.enterRule(_localctx, 294, IDLParser.RULE_home_body);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1336;
			this.match(IDLParser.LEFT_BRACE);
			this.state = 1340;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === IDLParser.STRING_LITERAL || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (IDLParser.DOUBLE_COLON - 32)) | (1 << (IDLParser.AT - 32)) | (1 << (IDLParser.KW_OUT - 32)) | (1 << (IDLParser.KW_EMITS - 32)) | (1 << (IDLParser.KW_STRING - 32)) | (1 << (IDLParser.KW_PUBLISHES - 32)) | (1 << (IDLParser.KW_TYPEDEF - 32)) | (1 << (IDLParser.KW_USES - 32)) | (1 << (IDLParser.KW_CUSTOM - 32)) | (1 << (IDLParser.KW_OCTET - 32)) | (1 << (IDLParser.KW_SEQUENCE - 32)) | (1 << (IDLParser.KW_IMPORT - 32)) | (1 << (IDLParser.KW_STRUCT - 32)) | (1 << (IDLParser.KW_NATIVE - 32)) | (1 << (IDLParser.KW_READONLY - 32)) | (1 << (IDLParser.KW_FINDER - 32)) | (1 << (IDLParser.KW_VOID - 32)) | (1 << (IDLParser.KW_PRIVATE - 32)) | (1 << (IDLParser.KW_EVENTTYPE - 32)) | (1 << (IDLParser.KW_WCHAR - 32)) | (1 << (IDLParser.KW_IN - 32)) | (1 << (IDLParser.KW_DEFAULT - 32)) | (1 << (IDLParser.KW_PUBLIC - 32)) | (1 << (IDLParser.KW_SHORT - 32)) | (1 << (IDLParser.KW_LONG - 32)) | (1 << (IDLParser.KW_ENUM - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (IDLParser.KW_WSTRING - 64)) | (1 << (IDLParser.KW_HOME - 64)) | (1 << (IDLParser.KW_FACTORY - 64)) | (1 << (IDLParser.KW_EXCEPTION - 64)) | (1 << (IDLParser.KW_CONST - 64)) | (1 << (IDLParser.KW_VALUEBASE - 64)) | (1 << (IDLParser.KW_VALUETYPE - 64)) | (1 << (IDLParser.KW_MODULE - 64)) | (1 << (IDLParser.KW_OBJECT - 64)) | (1 << (IDLParser.KW_UNSIGNED - 64)) | (1 << (IDLParser.KW_FIXED - 64)) | (1 << (IDLParser.KW_UNION - 64)) | (1 << (IDLParser.KW_ONEWAY - 64)) | (1 << (IDLParser.KW_ANY - 64)) | (1 << (IDLParser.KW_CHAR - 64)) | (1 << (IDLParser.KW_CASE - 64)) | (1 << (IDLParser.KW_FLOAT - 64)) | (1 << (IDLParser.KW_BOOLEAN - 64)) | (1 << (IDLParser.KW_ABSTRACT - 64)) | (1 << (IDLParser.KW_INOUT - 64)) | (1 << (IDLParser.KW_PROVIDES - 64)) | (1 << (IDLParser.KW_CONSUMES - 64)) | (1 << (IDLParser.KW_DOUBLE - 64)) | (1 << (IDLParser.KW_TYPEPREFIX - 64)) | (1 << (IDLParser.KW_TYPEID - 64)) | (1 << (IDLParser.KW_ATTRIBUTE - 64)) | (1 << (IDLParser.KW_LOCAL - 64)))) !== 0) || ((((_la - 97)) & ~0x1F) === 0 && ((1 << (_la - 97)) & ((1 << (IDLParser.KW_INTERFACE - 97)) | (1 << (IDLParser.KW_COMPONENT - 97)) | (1 << (IDLParser.KW_SET - 97)) | (1 << (IDLParser.KW_MAP - 97)) | (1 << (IDLParser.KW_BITFIELD - 97)) | (1 << (IDLParser.KW_BITSET - 97)) | (1 << (IDLParser.KW_BITMASK - 97)) | (1 << (IDLParser.KW_INT8 - 97)) | (1 << (IDLParser.KW_UINT8 - 97)) | (1 << (IDLParser.KW_INT16 - 97)) | (1 << (IDLParser.KW_UINT16 - 97)) | (1 << (IDLParser.KW_INT32 - 97)) | (1 << (IDLParser.KW_UINT32 - 97)) | (1 << (IDLParser.KW_INT64 - 97)) | (1 << (IDLParser.KW_UINT64 - 97)) | (1 << (IDLParser.KW_AT_ANNOTATION - 97)) | (1 << (IDLParser.ID - 97)))) !== 0)) {
				{
				{
				this.state = 1337;
				this.home_export();
				}
				}
				this.state = 1342;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 1343;
			this.match(IDLParser.RIGHT_BRACE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public home_export(): Home_exportContext {
		let _localctx: Home_exportContext = new Home_exportContext(this._ctx, this.state);
		this.enterRule(_localctx, 296, IDLParser.RULE_home_export);
		try {
			this.state = 1353;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 111, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1345;
				this.export_();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1346;
				this.annapps();
				this.state = 1349;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case IDLParser.KW_FACTORY:
					{
					this.state = 1347;
					this.factory_decl();
					}
					break;
				case IDLParser.KW_FINDER:
					{
					this.state = 1348;
					this.finder_decl();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 1351;
				this.match(IDLParser.SEMICOLON);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public factory_decl(): Factory_declContext {
		let _localctx: Factory_declContext = new Factory_declContext(this._ctx, this.state);
		this.enterRule(_localctx, 298, IDLParser.RULE_factory_decl);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1355;
			this.match(IDLParser.KW_FACTORY);
			this.state = 1356;
			this.identifier();
			this.state = 1357;
			this.match(IDLParser.LEFT_BRACKET);
			this.state = 1359;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === IDLParser.STRING_LITERAL || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (IDLParser.DOUBLE_COLON - 32)) | (1 << (IDLParser.AT - 32)) | (1 << (IDLParser.KW_OUT - 32)) | (1 << (IDLParser.KW_EMITS - 32)) | (1 << (IDLParser.KW_STRING - 32)) | (1 << (IDLParser.KW_PUBLISHES - 32)) | (1 << (IDLParser.KW_TYPEDEF - 32)) | (1 << (IDLParser.KW_USES - 32)) | (1 << (IDLParser.KW_CUSTOM - 32)) | (1 << (IDLParser.KW_OCTET - 32)) | (1 << (IDLParser.KW_SEQUENCE - 32)) | (1 << (IDLParser.KW_IMPORT - 32)) | (1 << (IDLParser.KW_STRUCT - 32)) | (1 << (IDLParser.KW_NATIVE - 32)) | (1 << (IDLParser.KW_READONLY - 32)) | (1 << (IDLParser.KW_FINDER - 32)) | (1 << (IDLParser.KW_VOID - 32)) | (1 << (IDLParser.KW_PRIVATE - 32)) | (1 << (IDLParser.KW_EVENTTYPE - 32)) | (1 << (IDLParser.KW_WCHAR - 32)) | (1 << (IDLParser.KW_IN - 32)) | (1 << (IDLParser.KW_DEFAULT - 32)) | (1 << (IDLParser.KW_PUBLIC - 32)) | (1 << (IDLParser.KW_SHORT - 32)) | (1 << (IDLParser.KW_LONG - 32)) | (1 << (IDLParser.KW_ENUM - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (IDLParser.KW_WSTRING - 64)) | (1 << (IDLParser.KW_HOME - 64)) | (1 << (IDLParser.KW_FACTORY - 64)) | (1 << (IDLParser.KW_EXCEPTION - 64)) | (1 << (IDLParser.KW_CONST - 64)) | (1 << (IDLParser.KW_VALUEBASE - 64)) | (1 << (IDLParser.KW_VALUETYPE - 64)) | (1 << (IDLParser.KW_MODULE - 64)) | (1 << (IDLParser.KW_OBJECT - 64)) | (1 << (IDLParser.KW_UNSIGNED - 64)) | (1 << (IDLParser.KW_FIXED - 64)) | (1 << (IDLParser.KW_UNION - 64)) | (1 << (IDLParser.KW_ONEWAY - 64)) | (1 << (IDLParser.KW_ANY - 64)) | (1 << (IDLParser.KW_CHAR - 64)) | (1 << (IDLParser.KW_CASE - 64)) | (1 << (IDLParser.KW_FLOAT - 64)) | (1 << (IDLParser.KW_BOOLEAN - 64)) | (1 << (IDLParser.KW_ABSTRACT - 64)) | (1 << (IDLParser.KW_INOUT - 64)) | (1 << (IDLParser.KW_PROVIDES - 64)) | (1 << (IDLParser.KW_CONSUMES - 64)) | (1 << (IDLParser.KW_DOUBLE - 64)) | (1 << (IDLParser.KW_TYPEPREFIX - 64)) | (1 << (IDLParser.KW_TYPEID - 64)) | (1 << (IDLParser.KW_ATTRIBUTE - 64)) | (1 << (IDLParser.KW_LOCAL - 64)))) !== 0) || ((((_la - 97)) & ~0x1F) === 0 && ((1 << (_la - 97)) & ((1 << (IDLParser.KW_INTERFACE - 97)) | (1 << (IDLParser.KW_COMPONENT - 97)) | (1 << (IDLParser.KW_SET - 97)) | (1 << (IDLParser.KW_MAP - 97)) | (1 << (IDLParser.KW_BITFIELD - 97)) | (1 << (IDLParser.KW_BITSET - 97)) | (1 << (IDLParser.KW_BITMASK - 97)) | (1 << (IDLParser.KW_INT8 - 97)) | (1 << (IDLParser.KW_UINT8 - 97)) | (1 << (IDLParser.KW_INT16 - 97)) | (1 << (IDLParser.KW_UINT16 - 97)) | (1 << (IDLParser.KW_INT32 - 97)) | (1 << (IDLParser.KW_UINT32 - 97)) | (1 << (IDLParser.KW_INT64 - 97)) | (1 << (IDLParser.KW_UINT64 - 97)) | (1 << (IDLParser.KW_AT_ANNOTATION - 97)) | (1 << (IDLParser.ID - 97)))) !== 0)) {
				{
				this.state = 1358;
				this.init_param_decls();
				}
			}

			this.state = 1361;
			this.match(IDLParser.RIGHT_BRACKET);
			this.state = 1363;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === IDLParser.KW_RAISES) {
				{
				this.state = 1362;
				this.raises_expr();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public finder_decl(): Finder_declContext {
		let _localctx: Finder_declContext = new Finder_declContext(this._ctx, this.state);
		this.enterRule(_localctx, 300, IDLParser.RULE_finder_decl);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1365;
			this.match(IDLParser.KW_FINDER);
			this.state = 1366;
			this.identifier();
			this.state = 1367;
			this.match(IDLParser.LEFT_BRACKET);
			this.state = 1369;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === IDLParser.STRING_LITERAL || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (IDLParser.DOUBLE_COLON - 32)) | (1 << (IDLParser.AT - 32)) | (1 << (IDLParser.KW_OUT - 32)) | (1 << (IDLParser.KW_EMITS - 32)) | (1 << (IDLParser.KW_STRING - 32)) | (1 << (IDLParser.KW_PUBLISHES - 32)) | (1 << (IDLParser.KW_TYPEDEF - 32)) | (1 << (IDLParser.KW_USES - 32)) | (1 << (IDLParser.KW_CUSTOM - 32)) | (1 << (IDLParser.KW_OCTET - 32)) | (1 << (IDLParser.KW_SEQUENCE - 32)) | (1 << (IDLParser.KW_IMPORT - 32)) | (1 << (IDLParser.KW_STRUCT - 32)) | (1 << (IDLParser.KW_NATIVE - 32)) | (1 << (IDLParser.KW_READONLY - 32)) | (1 << (IDLParser.KW_FINDER - 32)) | (1 << (IDLParser.KW_VOID - 32)) | (1 << (IDLParser.KW_PRIVATE - 32)) | (1 << (IDLParser.KW_EVENTTYPE - 32)) | (1 << (IDLParser.KW_WCHAR - 32)) | (1 << (IDLParser.KW_IN - 32)) | (1 << (IDLParser.KW_DEFAULT - 32)) | (1 << (IDLParser.KW_PUBLIC - 32)) | (1 << (IDLParser.KW_SHORT - 32)) | (1 << (IDLParser.KW_LONG - 32)) | (1 << (IDLParser.KW_ENUM - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (IDLParser.KW_WSTRING - 64)) | (1 << (IDLParser.KW_HOME - 64)) | (1 << (IDLParser.KW_FACTORY - 64)) | (1 << (IDLParser.KW_EXCEPTION - 64)) | (1 << (IDLParser.KW_CONST - 64)) | (1 << (IDLParser.KW_VALUEBASE - 64)) | (1 << (IDLParser.KW_VALUETYPE - 64)) | (1 << (IDLParser.KW_MODULE - 64)) | (1 << (IDLParser.KW_OBJECT - 64)) | (1 << (IDLParser.KW_UNSIGNED - 64)) | (1 << (IDLParser.KW_FIXED - 64)) | (1 << (IDLParser.KW_UNION - 64)) | (1 << (IDLParser.KW_ONEWAY - 64)) | (1 << (IDLParser.KW_ANY - 64)) | (1 << (IDLParser.KW_CHAR - 64)) | (1 << (IDLParser.KW_CASE - 64)) | (1 << (IDLParser.KW_FLOAT - 64)) | (1 << (IDLParser.KW_BOOLEAN - 64)) | (1 << (IDLParser.KW_ABSTRACT - 64)) | (1 << (IDLParser.KW_INOUT - 64)) | (1 << (IDLParser.KW_PROVIDES - 64)) | (1 << (IDLParser.KW_CONSUMES - 64)) | (1 << (IDLParser.KW_DOUBLE - 64)) | (1 << (IDLParser.KW_TYPEPREFIX - 64)) | (1 << (IDLParser.KW_TYPEID - 64)) | (1 << (IDLParser.KW_ATTRIBUTE - 64)) | (1 << (IDLParser.KW_LOCAL - 64)))) !== 0) || ((((_la - 97)) & ~0x1F) === 0 && ((1 << (_la - 97)) & ((1 << (IDLParser.KW_INTERFACE - 97)) | (1 << (IDLParser.KW_COMPONENT - 97)) | (1 << (IDLParser.KW_SET - 97)) | (1 << (IDLParser.KW_MAP - 97)) | (1 << (IDLParser.KW_BITFIELD - 97)) | (1 << (IDLParser.KW_BITSET - 97)) | (1 << (IDLParser.KW_BITMASK - 97)) | (1 << (IDLParser.KW_INT8 - 97)) | (1 << (IDLParser.KW_UINT8 - 97)) | (1 << (IDLParser.KW_INT16 - 97)) | (1 << (IDLParser.KW_UINT16 - 97)) | (1 << (IDLParser.KW_INT32 - 97)) | (1 << (IDLParser.KW_UINT32 - 97)) | (1 << (IDLParser.KW_INT64 - 97)) | (1 << (IDLParser.KW_UINT64 - 97)) | (1 << (IDLParser.KW_AT_ANNOTATION - 97)) | (1 << (IDLParser.ID - 97)))) !== 0)) {
				{
				this.state = 1368;
				this.init_param_decls();
				}
			}

			this.state = 1371;
			this.match(IDLParser.RIGHT_BRACKET);
			this.state = 1373;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === IDLParser.KW_RAISES) {
				{
				this.state = 1372;
				this.raises_expr();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public event(): EventContext {
		let _localctx: EventContext = new EventContext(this._ctx, this.state);
		this.enterRule(_localctx, 302, IDLParser.RULE_event);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1378;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 116, this._ctx) ) {
			case 1:
				{
				this.state = 1375;
				this.event_decl();
				}
				break;

			case 2:
				{
				this.state = 1376;
				this.event_abs_decl();
				}
				break;

			case 3:
				{
				this.state = 1377;
				this.event_forward_decl();
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public event_forward_decl(): Event_forward_declContext {
		let _localctx: Event_forward_declContext = new Event_forward_declContext(this._ctx, this.state);
		this.enterRule(_localctx, 304, IDLParser.RULE_event_forward_decl);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1381;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === IDLParser.KW_ABSTRACT) {
				{
				this.state = 1380;
				this.match(IDLParser.KW_ABSTRACT);
				}
			}

			this.state = 1383;
			this.match(IDLParser.KW_EVENTTYPE);
			this.state = 1384;
			this.match(IDLParser.ID);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public event_abs_decl(): Event_abs_declContext {
		let _localctx: Event_abs_declContext = new Event_abs_declContext(this._ctx, this.state);
		this.enterRule(_localctx, 306, IDLParser.RULE_event_abs_decl);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1386;
			this.match(IDLParser.KW_ABSTRACT);
			this.state = 1387;
			this.match(IDLParser.KW_EVENTTYPE);
			this.state = 1388;
			this.identifier();
			this.state = 1389;
			this.value_inheritance_spec();
			this.state = 1390;
			this.match(IDLParser.LEFT_BRACE);
			this.state = 1394;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === IDLParser.STRING_LITERAL || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (IDLParser.DOUBLE_COLON - 32)) | (1 << (IDLParser.AT - 32)) | (1 << (IDLParser.KW_OUT - 32)) | (1 << (IDLParser.KW_EMITS - 32)) | (1 << (IDLParser.KW_STRING - 32)) | (1 << (IDLParser.KW_PUBLISHES - 32)) | (1 << (IDLParser.KW_TYPEDEF - 32)) | (1 << (IDLParser.KW_USES - 32)) | (1 << (IDLParser.KW_CUSTOM - 32)) | (1 << (IDLParser.KW_OCTET - 32)) | (1 << (IDLParser.KW_SEQUENCE - 32)) | (1 << (IDLParser.KW_IMPORT - 32)) | (1 << (IDLParser.KW_STRUCT - 32)) | (1 << (IDLParser.KW_NATIVE - 32)) | (1 << (IDLParser.KW_READONLY - 32)) | (1 << (IDLParser.KW_FINDER - 32)) | (1 << (IDLParser.KW_VOID - 32)) | (1 << (IDLParser.KW_PRIVATE - 32)) | (1 << (IDLParser.KW_EVENTTYPE - 32)) | (1 << (IDLParser.KW_WCHAR - 32)) | (1 << (IDLParser.KW_IN - 32)) | (1 << (IDLParser.KW_DEFAULT - 32)) | (1 << (IDLParser.KW_PUBLIC - 32)) | (1 << (IDLParser.KW_SHORT - 32)) | (1 << (IDLParser.KW_LONG - 32)) | (1 << (IDLParser.KW_ENUM - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (IDLParser.KW_WSTRING - 64)) | (1 << (IDLParser.KW_HOME - 64)) | (1 << (IDLParser.KW_FACTORY - 64)) | (1 << (IDLParser.KW_EXCEPTION - 64)) | (1 << (IDLParser.KW_CONST - 64)) | (1 << (IDLParser.KW_VALUEBASE - 64)) | (1 << (IDLParser.KW_VALUETYPE - 64)) | (1 << (IDLParser.KW_MODULE - 64)) | (1 << (IDLParser.KW_OBJECT - 64)) | (1 << (IDLParser.KW_UNSIGNED - 64)) | (1 << (IDLParser.KW_FIXED - 64)) | (1 << (IDLParser.KW_UNION - 64)) | (1 << (IDLParser.KW_ONEWAY - 64)) | (1 << (IDLParser.KW_ANY - 64)) | (1 << (IDLParser.KW_CHAR - 64)) | (1 << (IDLParser.KW_CASE - 64)) | (1 << (IDLParser.KW_FLOAT - 64)) | (1 << (IDLParser.KW_BOOLEAN - 64)) | (1 << (IDLParser.KW_ABSTRACT - 64)) | (1 << (IDLParser.KW_INOUT - 64)) | (1 << (IDLParser.KW_PROVIDES - 64)) | (1 << (IDLParser.KW_CONSUMES - 64)) | (1 << (IDLParser.KW_DOUBLE - 64)) | (1 << (IDLParser.KW_TYPEPREFIX - 64)) | (1 << (IDLParser.KW_TYPEID - 64)) | (1 << (IDLParser.KW_ATTRIBUTE - 64)) | (1 << (IDLParser.KW_LOCAL - 64)))) !== 0) || ((((_la - 97)) & ~0x1F) === 0 && ((1 << (_la - 97)) & ((1 << (IDLParser.KW_INTERFACE - 97)) | (1 << (IDLParser.KW_COMPONENT - 97)) | (1 << (IDLParser.KW_SET - 97)) | (1 << (IDLParser.KW_MAP - 97)) | (1 << (IDLParser.KW_BITFIELD - 97)) | (1 << (IDLParser.KW_BITSET - 97)) | (1 << (IDLParser.KW_BITMASK - 97)) | (1 << (IDLParser.KW_INT8 - 97)) | (1 << (IDLParser.KW_UINT8 - 97)) | (1 << (IDLParser.KW_INT16 - 97)) | (1 << (IDLParser.KW_UINT16 - 97)) | (1 << (IDLParser.KW_INT32 - 97)) | (1 << (IDLParser.KW_UINT32 - 97)) | (1 << (IDLParser.KW_INT64 - 97)) | (1 << (IDLParser.KW_UINT64 - 97)) | (1 << (IDLParser.KW_AT_ANNOTATION - 97)) | (1 << (IDLParser.ID - 97)))) !== 0)) {
				{
				{
				this.state = 1391;
				this.export_();
				}
				}
				this.state = 1396;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 1397;
			this.match(IDLParser.RIGHT_BRACE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public event_decl(): Event_declContext {
		let _localctx: Event_declContext = new Event_declContext(this._ctx, this.state);
		this.enterRule(_localctx, 308, IDLParser.RULE_event_decl);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1399;
			this.event_header();
			this.state = 1400;
			this.match(IDLParser.LEFT_BRACE);
			this.state = 1404;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === IDLParser.STRING_LITERAL || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (IDLParser.DOUBLE_COLON - 32)) | (1 << (IDLParser.AT - 32)) | (1 << (IDLParser.KW_OUT - 32)) | (1 << (IDLParser.KW_EMITS - 32)) | (1 << (IDLParser.KW_STRING - 32)) | (1 << (IDLParser.KW_PUBLISHES - 32)) | (1 << (IDLParser.KW_TYPEDEF - 32)) | (1 << (IDLParser.KW_USES - 32)) | (1 << (IDLParser.KW_CUSTOM - 32)) | (1 << (IDLParser.KW_OCTET - 32)) | (1 << (IDLParser.KW_SEQUENCE - 32)) | (1 << (IDLParser.KW_IMPORT - 32)) | (1 << (IDLParser.KW_STRUCT - 32)) | (1 << (IDLParser.KW_NATIVE - 32)) | (1 << (IDLParser.KW_READONLY - 32)) | (1 << (IDLParser.KW_FINDER - 32)) | (1 << (IDLParser.KW_VOID - 32)) | (1 << (IDLParser.KW_PRIVATE - 32)) | (1 << (IDLParser.KW_EVENTTYPE - 32)) | (1 << (IDLParser.KW_WCHAR - 32)) | (1 << (IDLParser.KW_IN - 32)) | (1 << (IDLParser.KW_DEFAULT - 32)) | (1 << (IDLParser.KW_PUBLIC - 32)) | (1 << (IDLParser.KW_SHORT - 32)) | (1 << (IDLParser.KW_LONG - 32)) | (1 << (IDLParser.KW_ENUM - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (IDLParser.KW_WSTRING - 64)) | (1 << (IDLParser.KW_HOME - 64)) | (1 << (IDLParser.KW_FACTORY - 64)) | (1 << (IDLParser.KW_EXCEPTION - 64)) | (1 << (IDLParser.KW_CONST - 64)) | (1 << (IDLParser.KW_VALUEBASE - 64)) | (1 << (IDLParser.KW_VALUETYPE - 64)) | (1 << (IDLParser.KW_MODULE - 64)) | (1 << (IDLParser.KW_OBJECT - 64)) | (1 << (IDLParser.KW_UNSIGNED - 64)) | (1 << (IDLParser.KW_FIXED - 64)) | (1 << (IDLParser.KW_UNION - 64)) | (1 << (IDLParser.KW_ONEWAY - 64)) | (1 << (IDLParser.KW_ANY - 64)) | (1 << (IDLParser.KW_CHAR - 64)) | (1 << (IDLParser.KW_CASE - 64)) | (1 << (IDLParser.KW_FLOAT - 64)) | (1 << (IDLParser.KW_BOOLEAN - 64)) | (1 << (IDLParser.KW_ABSTRACT - 64)) | (1 << (IDLParser.KW_INOUT - 64)) | (1 << (IDLParser.KW_PROVIDES - 64)) | (1 << (IDLParser.KW_CONSUMES - 64)) | (1 << (IDLParser.KW_DOUBLE - 64)) | (1 << (IDLParser.KW_TYPEPREFIX - 64)) | (1 << (IDLParser.KW_TYPEID - 64)) | (1 << (IDLParser.KW_ATTRIBUTE - 64)) | (1 << (IDLParser.KW_LOCAL - 64)))) !== 0) || ((((_la - 97)) & ~0x1F) === 0 && ((1 << (_la - 97)) & ((1 << (IDLParser.KW_INTERFACE - 97)) | (1 << (IDLParser.KW_COMPONENT - 97)) | (1 << (IDLParser.KW_SET - 97)) | (1 << (IDLParser.KW_MAP - 97)) | (1 << (IDLParser.KW_BITFIELD - 97)) | (1 << (IDLParser.KW_BITSET - 97)) | (1 << (IDLParser.KW_BITMASK - 97)) | (1 << (IDLParser.KW_INT8 - 97)) | (1 << (IDLParser.KW_UINT8 - 97)) | (1 << (IDLParser.KW_INT16 - 97)) | (1 << (IDLParser.KW_UINT16 - 97)) | (1 << (IDLParser.KW_INT32 - 97)) | (1 << (IDLParser.KW_UINT32 - 97)) | (1 << (IDLParser.KW_INT64 - 97)) | (1 << (IDLParser.KW_UINT64 - 97)) | (1 << (IDLParser.KW_AT_ANNOTATION - 97)) | (1 << (IDLParser.ID - 97)))) !== 0)) {
				{
				{
				this.state = 1401;
				this.value_element();
				}
				}
				this.state = 1406;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 1407;
			this.match(IDLParser.RIGHT_BRACE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public event_header(): Event_headerContext {
		let _localctx: Event_headerContext = new Event_headerContext(this._ctx, this.state);
		this.enterRule(_localctx, 310, IDLParser.RULE_event_header);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1410;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === IDLParser.KW_CUSTOM) {
				{
				this.state = 1409;
				this.match(IDLParser.KW_CUSTOM);
				}
			}

			this.state = 1412;
			this.match(IDLParser.KW_EVENTTYPE);
			this.state = 1413;
			this.identifier();
			this.state = 1414;
			this.value_inheritance_spec();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public annapps(): AnnappsContext {
		let _localctx: AnnappsContext = new AnnappsContext(this._ctx, this.state);
		this.enterRule(_localctx, 312, IDLParser.RULE_annapps);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1419;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 121, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 1416;
					this.annotation_appl();
					}
					}
				}
				this.state = 1421;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 121, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public annotation_appl(): Annotation_applContext {
		let _localctx: Annotation_applContext = new Annotation_applContext(this._ctx, this.state);
		this.enterRule(_localctx, 314, IDLParser.RULE_annotation_appl);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1422;
			this.match(IDLParser.AT);
			this.state = 1423;
			this.scoped_name();
			this.state = 1428;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === IDLParser.LEFT_BRACKET) {
				{
				this.state = 1424;
				this.match(IDLParser.LEFT_BRACKET);
				this.state = 1425;
				this.annotation_appl_params();
				this.state = 1426;
				this.match(IDLParser.RIGHT_BRACKET);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public annotation_appl_params(): Annotation_appl_paramsContext {
		let _localctx: Annotation_appl_paramsContext = new Annotation_appl_paramsContext(this._ctx, this.state);
		this.enterRule(_localctx, 316, IDLParser.RULE_annotation_appl_params);
		let _la: number;
		try {
			this.state = 1439;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 124, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1430;
				this.const_exp();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1431;
				this.annotation_appl_param();
				this.state = 1436;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === IDLParser.COMMA) {
					{
					{
					this.state = 1432;
					this.match(IDLParser.COMMA);
					this.state = 1433;
					this.annotation_appl_param();
					}
					}
					this.state = 1438;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public annotation_appl_param(): Annotation_appl_paramContext {
		let _localctx: Annotation_appl_paramContext = new Annotation_appl_paramContext(this._ctx, this.state);
		this.enterRule(_localctx, 318, IDLParser.RULE_annotation_appl_param);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1441;
			this.match(IDLParser.ID);
			this.state = 1442;
			this.match(IDLParser.EQUAL);
			this.state = 1443;
			this.const_exp();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public identifier(): IdentifierContext {
		let _localctx: IdentifierContext = new IdentifierContext(this._ctx, this.state);
		this.enterRule(_localctx, 320, IDLParser.RULE_identifier);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1445;
			this.annapps();
			this.state = 1446;
			this.match(IDLParser.ID);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	private static readonly _serializedATNSegments: number = 3;
	private static readonly _serializedATNSegment0: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03v\u05AB\x04\x02" +
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
		"\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04" +
		"\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12\x04" +
		"\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t\x17\x04" +
		"\x18\t\x18\x04\x19\t\x19\x04\x1A\t\x1A\x04\x1B\t\x1B\x04\x1C\t\x1C\x04" +
		"\x1D\t\x1D\x04\x1E\t\x1E\x04\x1F\t\x1F\x04 \t \x04!\t!\x04\"\t\"\x04#" +
		"\t#\x04$\t$\x04%\t%\x04&\t&\x04\'\t\'\x04(\t(\x04)\t)\x04*\t*\x04+\t+" +
		"\x04,\t,\x04-\t-\x04.\t.\x04/\t/\x040\t0\x041\t1\x042\t2\x043\t3\x044" +
		"\t4\x045\t5\x046\t6\x047\t7\x048\t8\x049\t9\x04:\t:\x04;\t;\x04<\t<\x04" +
		"=\t=\x04>\t>\x04?\t?\x04@\t@\x04A\tA\x04B\tB\x04C\tC\x04D\tD\x04E\tE\x04" +
		"F\tF\x04G\tG\x04H\tH\x04I\tI\x04J\tJ\x04K\tK\x04L\tL\x04M\tM\x04N\tN\x04" +
		"O\tO\x04P\tP\x04Q\tQ\x04R\tR\x04S\tS\x04T\tT\x04U\tU\x04V\tV\x04W\tW\x04" +
		"X\tX\x04Y\tY\x04Z\tZ\x04[\t[\x04\\\t\\\x04]\t]\x04^\t^\x04_\t_\x04`\t" +
		"`\x04a\ta\x04b\tb\x04c\tc\x04d\td\x04e\te\x04f\tf\x04g\tg\x04h\th\x04" +
		"i\ti\x04j\tj\x04k\tk\x04l\tl\x04m\tm\x04n\tn\x04o\to\x04p\tp\x04q\tq\x04" +
		"r\tr\x04s\ts\x04t\tt\x04u\tu\x04v\tv\x04w\tw\x04x\tx\x04y\ty\x04z\tz\x04" +
		"{\t{\x04|\t|\x04}\t}\x04~\t~\x04\x7F\t\x7F\x04\x80\t\x80\x04\x81\t\x81" +
		"\x04\x82\t\x82\x04\x83\t\x83\x04\x84\t\x84\x04\x85\t\x85\x04\x86\t\x86" +
		"\x04\x87\t\x87\x04\x88\t\x88\x04\x89\t\x89\x04\x8A\t\x8A\x04\x8B\t\x8B" +
		"\x04\x8C\t\x8C\x04\x8D\t\x8D\x04\x8E\t\x8E\x04\x8F\t\x8F\x04\x90\t\x90" +
		"\x04\x91\t\x91\x04\x92\t\x92\x04\x93\t\x93\x04\x94\t\x94\x04\x95\t\x95" +
		"\x04\x96\t\x96\x04\x97\t\x97\x04\x98\t\x98\x04\x99\t\x99\x04\x9A\t\x9A" +
		"\x04\x9B\t\x9B\x04\x9C\t\x9C\x04\x9D\t\x9D\x04\x9E\t\x9E\x04\x9F\t\x9F" +
		"\x04\xA0\t\xA0\x04\xA1\t\xA1\x04\xA2\t\xA2\x03\x02\x07\x02\u0146\n\x02" +
		"\f\x02\x0E\x02\u0149\v\x02\x03\x02\x06\x02\u014C\n\x02\r\x02\x0E\x02\u014D" +
		"\x03\x02\x03\x02\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x05\x03\u0177\n\x03\x03\x04\x03\x04\x03\x04\x03" +
		"\x04\x06\x04\u017D\n\x04\r\x04\x0E\x04\u017E\x03\x04\x03\x04\x03\x05\x03" +
		"\x05\x03\x05\x05\x05\u0186\n\x05\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06" +
		"\x03\x07\x05\x07\u018E\n\x07\x03\x07\x03\x07\x03\x07\x03\b\x05\b\u0194" +
		"\n\b\x03\b\x03\b\x03\b\x05\b\u0199\n\b\x03\t\x07\t\u019C\n\t\f\t\x0E\t" +
		"\u019F\v\t\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n" +
		"\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03" +
		"\n\x05\n\u01B7\n\n\x03\v\x03\v\x03\v\x03\v\x07\v\u01BD\n\v\f\v\x0E\v\u01C0" +
		"\v\v\x03\f\x03\f\x03\r\x03\r\x03\r\x03\x0E\x05\x0E\u01C8\n\x0E\x03\x0E" +
		"\x03\x0E\x03\x0E\x07\x0E\u01CD\n\x0E\f\x0E\x0E\x0E\u01D0\v\x0E\x03\x0F" +
		"\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x05\x0F\u01D7\n\x0F\x03\x10\x05\x10\u01DA" +
		"\n\x10\x03\x10\x03\x10\x03\x10\x03\x11\x03\x11\x03\x11\x03\x11\x03\x12" +
		"\x03\x12\x03\x12\x03\x12\x03\x12\x03\x12\x07\x12\u01E9\n\x12\f\x12\x0E" +
		"\x12\u01EC\v\x12\x03\x12\x03\x12\x03\x13\x03\x13\x03\x13\x07\x13\u01F3" +
		"\n\x13\f\x13\x0E\x13\u01F6\v\x13\x03\x13\x03\x13\x03\x14\x05\x14\u01FB" +
		"\n\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x15\x03\x15\x05\x15\u0203\n" +
		"\x15\x03\x15\x03\x15\x03\x15\x07\x15\u0208\n\x15\f\x15\x0E\x15\u020B\v" +
		"\x15\x05\x15\u020D\n\x15\x03\x15\x03\x15\x03\x15\x03\x15\x07\x15\u0213" +
		"\n\x15\f\x15\x0E\x15\u0216\v\x15\x05\x15\u0218\n\x15\x03\x16\x03\x16\x03" +
		"\x17\x03\x17\x03\x17\x05\x17\u021F\n\x17\x03\x18\x03\x18\x03\x18\x03\x18" +
		"\x03\x18\x05\x18\u0226\n\x18\x03\x18\x03\x18\x03\x18\x03\x18\x03\x19\x03" +
		"\x19\x03\x19\x03\x19\x03\x19\x05\x19\u0231\n\x19\x03\x19\x03\x19\x05\x19" +
		"\u0235\n\x19\x03\x19\x03\x19\x03\x1A\x03\x1A\x03\x1A\x07\x1A\u023C\n\x1A" +
		"\f\x1A\x0E\x1A\u023F\v\x1A\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x03" +
		"\x1B\x03\x1B\x03\x1C\x03\x1C\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03" +
		"\x1D\x03\x1E\x03\x1E\x03\x1E\x03\x1E\x03\x1E\x03\x1E\x03\x1E\x03\x1E\x03" +
		"\x1E\x03\x1E\x03\x1E\x05\x1E\u025B\n\x1E\x03\x1F\x03\x1F\x03 \x03 \x03" +
		" \x07 \u0262\n \f \x0E \u0265\v \x03!\x03!\x03!\x07!\u026A\n!\f!\x0E!" +
		"\u026D\v!\x03\"\x03\"\x03\"\x07\"\u0272\n\"\f\"\x0E\"\u0275\v\"\x03#\x03" +
		"#\x03#\x07#\u027A\n#\f#\x0E#\u027D\v#\x03$\x03$\x03$\x07$\u0282\n$\f$" +
		"\x0E$\u0285\v$\x03%\x03%\x03%\x07%\u028A\n%\f%\x0E%\u028D\v%\x03&\x03" +
		"&\x03&\x03&\x05&\u0293\n&\x03\'\x03\'\x03(\x03(\x03(\x03(\x03(\x03(\x05" +
		"(\u029D\n(\x03)\x03)\x03*\x03*\x03+\x03+\x03+\x03+\x03+\x03+\x03+\x03" +
		"+\x03+\x03+\x03+\x03+\x03+\x03+\x05+\u02B1\n+\x03,\x03,\x03,\x03-\x03" +
		"-\x05-\u02B8\n-\x03.\x03.\x03.\x05.\u02BD\n.\x03/\x03/\x03/\x05/\u02C2" +
		"\n/\x030\x030\x030\x030\x030\x030\x030\x030\x030\x050\u02CD\n0\x031\x03" +
		"1\x031\x031\x031\x031\x051\u02D5\n1\x032\x032\x032\x032\x032\x052\u02DC" +
		"\n2\x033\x033\x033\x073\u02E1\n3\f3\x0E3\u02E4\v3\x034\x034\x034\x074" +
		"\u02E9\n4\f4\x0E4\u02EC\v4\x035\x035\x035\x055\u02F1\n5\x036\x036\x03" +
		"7\x037\x038\x038\x038\x038\x058\u02FB\n8\x039\x039\x059\u02FF\n9\x03:" +
		"\x03:\x03:\x03:\x05:\u0305\n:\x03;\x03;\x03<\x03<\x03=\x03=\x03>\x03>" +
		"\x03>\x05>\u0310\n>\x03?\x03?\x03?\x03?\x05?\u0316\n?\x03@\x03@\x03A\x03" +
		"A\x03A\x05A\u031D\nA\x03B\x03B\x03B\x05B\u0322\nB\x03C\x03C\x03C\x03C" +
		"\x05C\u0328\nC\x03D\x03D\x03E\x03E\x03F\x03F\x03G\x03G\x03H\x03H\x03I" +
		"\x03I\x03J\x03J\x05J\u0338\nJ\x03K\x03K\x03K\x03K\x03K\x03L\x03L\x03L" +
		"\x05L\u0342\nL\x03M\x03M\x03M\x03N\x03N\x03N\x03N\x03N\x03N\x03N\x03N" +
		"\x03N\x03N\x03N\x07N\u0352\nN\fN\x0EN\u0355\vN\x03O\x03O\x03O\x03O\x05" +
		"O\u035B\nO\x03O\x03O\x03P\x03P\x03P\x03Q\x03Q\x03Q\x03Q\x05Q\u0366\nQ" +
		"\x03Q\x03Q\x03Q\x03Q\x03R\x03R\x05R\u036E\nR\x03R\x03R\x06R\u0372\nR\r" +
		"R\x0ER\u0373\x03S\x03S\x03S\x03S\x03S\x03S\x05S\u037C\nS\x03S\x03S\x03" +
		"T\x03T\x03T\x03T\x03T\x03T\x03U\x03U\x03U\x07U\u0389\nU\fU\x0EU\u038C" +
		"\vU\x03V\x03V\x03V\x03V\x05V\u0392\nV\x03V\x03V\x03V\x03V\x03W\x07W\u0399" +
		"\nW\fW\x0EW\u039C\vW\x03X\x03X\x03X\x03X\x03X\x03Y\x03Y\x03Y\x03Y\x03" +
		"Y\x03Y\x03Y\x03Y\x03Y\x03Y\x03Y\x03Z\x03Z\x03Z\x03Z\x03Z\x03Z\x03Z\x05" +
		"Z\u03B5\nZ\x03[\x06[\u03B8\n[\r[\x0E[\u03B9\x03\\\x06\\\u03BD\n\\\r\\" +
		"\x0E\\\u03BE\x03\\\x03\\\x03\\\x03]\x03]\x03]\x03]\x03]\x03]\x03]\x05" +
		"]\u03CB\n]\x03^\x03^\x03^\x03^\x03_\x03_\x03_\x03_\x03_\x03_\x07_\u03D7" +
		"\n_\f_\x0E_\u03DA\v_\x03_\x03_\x03`\x03`\x03a\x03a\x03a\x03a\x03a\x03" +
		"a\x05a\u03E6\na\x03a\x03a\x03b\x03b\x03b\x03b\x03b\x05b\u03EF\nb\x03b" +
		"\x03b\x03c\x03c\x03c\x03c\x03c\x03c\x03c\x05c\u03FA\nc\x03c\x03c\x03d" +
		"\x03d\x03d\x03d\x03d\x05d\u0403\nd\x03e\x03e\x03e\x03e\x03e\x05e\u040A" +
		"\ne\x03f\x03f\x06f\u040E\nf\rf\x0Ef\u040F\x03g\x03g\x03g\x03g\x03h\x03" +
		"h\x05h\u0418\nh\x03i\x03i\x03i\x03i\x07i\u041E\ni\fi\x0Ei\u0421\vi\x03" +
		"i\x03i\x03j\x05j\u0426\nj\x03j\x03j\x03j\x03j\x05j\u042C\nj\x03j\x05j" +
		"\u042F\nj\x03k\x03k\x03l\x03l\x03l\x05l\u0436\nl\x03m\x03m\x03m\x03m\x07" +
		"m\u043C\nm\fm\x0Em\u043F\vm\x05m\u0441\nm\x03m\x03m\x03n\x03n\x03n\x03" +
		"n\x03n\x03n\x03n\x03o\x03o\x03p\x03p\x03p\x03p\x03p\x07p\u0453\np\fp\x0E" +
		"p\u0456\vp\x03p\x03p\x03q\x03q\x03q\x03q\x03q\x07q\u045F\nq\fq\x0Eq\u0462" +
		"\vq\x03q\x03q\x03r\x03r\x03r\x03r\x05r\u046A\nr\x03s\x03s\x03s\x03s\x03" +
		"s\x03s\x03s\x03t\x03t\x03u\x03u\x03v\x03v\x03v\x03v\x05v\u047B\nv\x03" +
		"w\x03w\x03w\x03w\x03w\x03w\x03x\x03x\x05x\u0485\nx\x03y\x03y\x03y\x03" +
		"y\x03z\x03z\x03z\x03z\x03{\x03{\x03{\x03{\x03{\x03{\x03|\x03|\x03|\x03" +
		"|\x03|\x03|\x03|\x07|\u049C\n|\f|\x0E|\u049F\v|\x05|\u04A1\n|\x03}\x03" +
		"}\x03}\x03}\x03}\x03~\x03~\x03~\x03~\x03~\x03~\x03~\x07~\u04AF\n~\f~\x0E" +
		"~\u04B2\v~\x05~\u04B4\n~\x03\x7F\x03\x7F\x05\x7F\u04B8\n\x7F\x03\x7F\x05" +
		"\x7F\u04BB\n\x7F\x03\x80\x03\x80\x03\x80\x03\x81\x03\x81\x03\x81\x03\x82" +
		"\x03\x82\x03\x82\x03\x82\x07\x82\u04C7\n\x82\f\x82\x0E\x82\u04CA\v\x82" +
		"\x03\x82\x03\x82\x03\x83\x03\x83\x05\x83\u04D0\n\x83\x03\x84\x03\x84\x03" +
		"\x84\x03\x85\x03\x85\x03\x85\x03\x85\x03\x85\x03\x86\x03\x86\x03\x86\x05" +
		"\x86\u04DD\n\x86\x03\x86\x05\x86\u04E0\n\x86\x03\x87\x03\x87\x03\x87\x03" +
		"\x87\x07\x87\u04E6\n\x87\f\x87\x0E\x87\u04E9\v\x87\x03\x88\x03\x88\x03" +
		"\x88\x03\x89\x07\x89\u04EF\n\x89\f\x89\x0E\x89\u04F2\v\x89\x03\x8A\x03" +
		"\x8A\x03\x8A\x03\x8A\x03\x8A\x03\x8A\x03\x8A\x03\x8A\x03\x8A\x03\x8A\x03" +
		"\x8A\x03\x8A\x03\x8A\x03\x8A\x03\x8A\x03\x8A\x03\x8A\x03\x8A\x03\x8A\x05" +
		"\x8A\u0507\n\x8A\x03\x8B\x03\x8B\x03\x8B\x03\x8B\x03\x8C\x03\x8C\x03\x8C" +
		"\x05\x8C\u0510\n\x8C\x03\x8D\x03\x8D\x05\x8D\u0514\n\x8D\x03\x8D\x03\x8D" +
		"\x03\x8D\x03\x8E\x03\x8E\x03\x8E\x03\x8E\x03\x8F\x03\x8F\x03\x8F\x03\x8F" +
		"\x03\x90\x03\x90\x03\x90\x03\x90\x03\x91\x03\x91\x03\x91\x03\x92\x03\x92" +
		"\x03\x92\x05\x92\u052B\n\x92\x03\x92\x05\x92\u052E\n\x92\x03\x92\x03\x92" +
		"\x03\x92\x05\x92\u0533\n\x92\x03\x93\x03\x93\x03\x93\x03\x94\x03\x94\x03" +
		"\x94\x03\x95\x03\x95\x07\x95\u053D\n\x95\f\x95\x0E\x95\u0540\v\x95\x03" +
		"\x95\x03\x95\x03\x96\x03\x96\x03\x96\x03\x96\x05\x96\u0548\n\x96\x03\x96" +
		"\x03\x96\x05\x96\u054C\n\x96\x03\x97\x03\x97\x03\x97\x03\x97\x05\x97\u0552" +
		"\n\x97\x03\x97\x03\x97\x05\x97\u0556\n\x97\x03\x98\x03\x98\x03\x98\x03" +
		"\x98\x05\x98\u055C\n\x98\x03\x98\x03\x98\x05\x98\u0560\n\x98\x03\x99\x03" +
		"\x99\x03\x99\x05\x99\u0565\n\x99\x03\x9A\x05\x9A\u0568\n\x9A\x03\x9A\x03" +
		"\x9A\x03\x9A\x03\x9B\x03\x9B\x03\x9B\x03\x9B\x03\x9B\x03\x9B\x07\x9B\u0573" +
		"\n\x9B\f\x9B\x0E\x9B\u0576\v\x9B\x03\x9B\x03\x9B\x03\x9C\x03\x9C\x03\x9C" +
		"\x07\x9C\u057D\n\x9C\f\x9C\x0E\x9C\u0580\v\x9C\x03\x9C\x03\x9C\x03\x9D" +
		"\x05\x9D\u0585\n\x9D\x03\x9D\x03\x9D\x03\x9D\x03\x9D\x03\x9E\x07\x9E\u058C" +
		"\n\x9E\f\x9E\x0E\x9E\u058F\v\x9E\x03\x9F\x03\x9F\x03\x9F\x03\x9F\x03\x9F" +
		"\x03\x9F\x05\x9F\u0597\n\x9F\x03\xA0\x03\xA0\x03\xA0\x03\xA0\x07\xA0\u059D" +
		"\n\xA0\f\xA0\x0E\xA0\u05A0\v\xA0\x05\xA0\u05A2\n\xA0\x03\xA1\x03\xA1\x03" +
		"\xA1\x03\xA1\x03\xA2\x03\xA2\x03\xA2\x03\xA2\x02\x02\x02\xA3\x02\x02\x04" +
		"\x02\x06\x02\b\x02\n\x02\f\x02\x0E\x02\x10\x02\x12\x02\x14\x02\x16\x02" +
		"\x18\x02\x1A\x02\x1C\x02\x1E\x02 \x02\"\x02$\x02&\x02(\x02*\x02,\x02." +
		"\x020\x022\x024\x026\x028\x02:\x02<\x02>\x02@\x02B\x02D\x02F\x02H\x02" +
		"J\x02L\x02N\x02P\x02R\x02T\x02V\x02X\x02Z\x02\\\x02^\x02`\x02b\x02d\x02" +
		"f\x02h\x02j\x02l\x02n\x02p\x02r\x02t\x02v\x02x\x02z\x02|\x02~\x02\x80" +
		"\x02\x82\x02\x84\x02\x86\x02\x88\x02\x8A\x02\x8C\x02\x8E\x02\x90\x02\x92" +
		"\x02\x94\x02\x96\x02\x98\x02\x9A\x02\x9C\x02\x9E\x02\xA0\x02\xA2\x02\xA4" +
		"\x02\xA6\x02\xA8\x02\xAA\x02\xAC\x02\xAE\x02\xB0\x02\xB2\x02\xB4\x02\xB6" +
		"\x02\xB8\x02\xBA\x02\xBC\x02\xBE\x02\xC0\x02\xC2\x02\xC4\x02\xC6\x02\xC8" +
		"\x02\xCA\x02\xCC\x02\xCE\x02\xD0\x02\xD2\x02\xD4\x02\xD6\x02\xD8\x02\xDA" +
		"\x02\xDC\x02\xDE\x02\xE0\x02\xE2\x02\xE4\x02\xE6\x02\xE8\x02\xEA\x02\xEC" +
		"\x02\xEE\x02\xF0\x02\xF2\x02\xF4\x02\xF6\x02\xF8\x02\xFA\x02\xFC\x02\xFE" +
		"\x02\u0100\x02\u0102\x02\u0104\x02\u0106\x02\u0108\x02\u010A\x02\u010C" +
		"\x02\u010E\x02\u0110\x02\u0112\x02\u0114\x02\u0116\x02\u0118\x02\u011A" +
		"\x02\u011C\x02\u011E\x02\u0120\x02\u0122\x02\u0124\x02\u0126\x02\u0128" +
		"\x02\u012A\x02\u012C\x02\u012E\x02\u0130\x02\u0132\x02\u0134\x02\u0136" +
		"\x02\u0138\x02\u013A\x02\u013C\x02\u013E\x02\u0140\x02\u0142\x02\x02\v" +
		"\x04\x02YYaa\x03\x02#$\x03\x02\x1B\x1C\x05\x02\x17\x17\x1A\x1A!!\x04\x02" +
		"\x16\x16\x1B\x1C\x03\x02\x03\f\x04\x02??ll\x04\x02@@nn\x05\x02\'\'<<Z" +
		"Z\x02\u05CA\x02\u0147\x03\x02\x02\x02\x04\u0151\x03\x02\x02\x02\x06\u0178" +
		"\x03\x02\x02\x02\b\u0182\x03\x02\x02\x02\n\u0187\x03\x02\x02\x02\f\u018D" +
		"\x03\x02\x02\x02\x0E\u0193\x03\x02\x02\x02\x10\u019D\x03\x02\x02\x02\x12" +
		"\u01A0\x03\x02\x02\x02\x14\u01B8\x03\x02\x02\x02\x16\u01C1\x03\x02\x02" +
		"\x02\x18\u01C3\x03\x02\x02\x02\x1A\u01C7\x03\x02\x02\x02\x1C\u01D1\x03" +
		"\x02\x02\x02\x1E\u01D9\x03\x02\x02\x02 \u01DE\x03\x02\x02\x02\"\u01E2" +
		"\x03\x02\x02\x02$\u01EF\x03\x02\x02\x02&\u01FA\x03\x02\x02\x02(\u020C" +
		"\x03\x02\x02\x02*\u0219\x03\x02\x02\x02,\u021E\x03\x02\x02\x02.\u0220" +
		"\x03\x02\x02\x020\u022B\x03\x02\x02\x022\u0238\x03\x02\x02\x024\u0240" +
		"\x03\x02\x02\x026\u0247\x03\x02\x02\x028\u0249\x03\x02\x02\x02:\u024F" +
		"\x03\x02\x02\x02<\u025C\x03\x02\x02\x02>\u025E\x03\x02\x02\x02@\u0266" +
		"\x03\x02\x02\x02B\u026E\x03\x02\x02\x02D\u0276\x03\x02\x02\x02F\u027E" +
		"\x03\x02\x02\x02H\u0286\x03\x02\x02\x02J\u0292\x03\x02\x02\x02L\u0294" +
		"\x03\x02\x02\x02N\u029C\x03\x02\x02\x02P\u029E\x03\x02\x02\x02R\u02A0" +
		"\x03\x02\x02\x02T\u02B0\x03\x02\x02\x02V\u02B2\x03\x02\x02\x02X\u02B7" +
		"\x03\x02\x02\x02Z\u02BC\x03\x02\x02\x02\\\u02C1\x03\x02\x02\x02^\u02CC" +
		"\x03\x02\x02\x02`\u02D4\x03\x02\x02\x02b\u02DB\x03\x02\x02\x02d\u02DD" +
		"\x03\x02\x02\x02f\u02E5\x03\x02\x02\x02h\u02ED\x03\x02\x02\x02j\u02F2" +
		"\x03\x02\x02\x02l\u02F4\x03\x02\x02\x02n\u02FA\x03\x02\x02\x02p\u02FE" +
		"\x03\x02\x02\x02r\u0304\x03\x02\x02\x02t\u0306\x03\x02\x02\x02v\u0308" +
		"\x03\x02\x02\x02x\u030A\x03\x02\x02\x02z\u030F\x03\x02\x02\x02|\u0315" +
		"\x03\x02\x02\x02~\u0317\x03\x02\x02\x02\x80\u031C\x03\x02\x02\x02\x82" +
		"\u0321\x03\x02\x02\x02\x84\u0327\x03\x02\x02\x02\x86\u0329\x03\x02\x02" +
		"\x02\x88\u032B\x03\x02\x02\x02\x8A\u032D\x03\x02\x02\x02\x8C\u032F\x03" +
		"\x02\x02\x02\x8E\u0331\x03\x02\x02\x02\x90\u0333\x03\x02\x02\x02\x92\u0337" +
		"\x03\x02\x02\x02\x94\u0339\x03\x02\x02\x02\x96\u033E\x03\x02\x02\x02\x98" +
		"\u0343\x03\x02\x02\x02\x9A\u0353\x03\x02\x02\x02\x9C\u0356\x03\x02\x02" +
		"\x02\x9E\u035E\x03\x02\x02\x02\xA0\u0361\x03\x02\x02\x02\xA2\u0371\x03" +
		"\x02\x02\x02\xA4\u0375\x03\x02\x02\x02\xA6\u037F\x03\x02\x02\x02\xA8\u0385" +
		"\x03\x02\x02\x02\xAA\u038D\x03\x02\x02\x02\xAC\u039A\x03\x02\x02\x02\xAE" +
		"\u039D\x03\x02\x02\x02\xB0\u03A2\x03\x02\x02\x02\xB2\u03B4\x03\x02\x02" +
		"\x02\xB4\u03B7\x03\x02\x02\x02\xB6\u03BC\x03\x02\x02\x02\xB8\u03C3\x03" +
		"\x02\x02\x02\xBA\u03CC\x03\x02\x02\x02\xBC\u03D0\x03\x02\x02\x02\xBE\u03DD" +
		"\x03\x02\x02\x02\xC0\u03DF\x03\x02\x02\x02\xC2\u03E9\x03\x02\x02\x02\xC4" +
		"\u03F2\x03\x02\x02\x02\xC6\u03FD\x03\x02\x02\x02\xC8\u0404\x03\x02\x02" +
		"\x02\xCA\u040B\x03\x02\x02\x02\xCC\u0411\x03\x02\x02\x02\xCE\u0417\x03" +
		"\x02\x02\x02\xD0\u0419\x03\x02\x02\x02\xD2\u0425\x03\x02\x02\x02\xD4\u0430" +
		"\x03\x02\x02\x02\xD6\u0432\x03\x02\x02\x02\xD8\u0437\x03\x02\x02\x02\xDA" +
		"\u0444\x03\x02\x02\x02\xDC\u044B\x03\x02\x02\x02\xDE\u044D\x03\x02\x02" +
		"\x02\xE0\u0459\x03\x02\x02\x02\xE2\u0469\x03\x02\x02\x02\xE4\u046B\x03" +
		"\x02\x02\x02\xE6\u0472\x03\x02\x02\x02\xE8\u0474\x03\x02\x02\x02\xEA\u047A" +
		"\x03\x02\x02\x02\xEC\u047C\x03\x02\x02\x02\xEE\u0484\x03\x02\x02\x02\xF0" +
		"\u0486\x03\x02\x02\x02\xF2\u048A\x03\x02\x02\x02\xF4\u048E\x03\x02\x02" +
		"\x02\xF6\u0494\x03\x02\x02\x02\xF8\u04A2\x03\x02\x02\x02\xFA\u04A7\x03" +
		"\x02\x02\x02\xFC\u04BA\x03\x02\x02\x02\xFE\u04BC\x03\x02\x02\x02\u0100" +
		"\u04BF\x03\x02\x02\x02\u0102\u04C2\x03\x02\x02\x02\u0104\u04CF\x03\x02" +
		"\x02\x02\u0106\u04D1\x03\x02\x02\x02\u0108\u04D4\x03\x02\x02\x02\u010A" +
		"\u04D9\x03\x02\x02\x02\u010C\u04E1\x03\x02\x02\x02\u010E\u04EA\x03\x02" +
		"\x02\x02\u0110\u04F0\x03\x02\x02\x02\u0112\u04F3\x03\x02\x02\x02\u0114" +
		"\u0508\x03\x02\x02\x02\u0116\u050C\x03\x02\x02\x02\u0118\u0511\x03\x02" +
		"\x02\x02\u011A\u0518\x03\x02\x02\x02\u011C\u051C\x03\x02\x02\x02\u011E" +
		"\u0520\x03\x02\x02\x02\u0120\u0524\x03\x02\x02\x02\u0122\u0527\x03\x02" +
		"\x02\x02\u0124\u0534\x03\x02\x02\x02\u0126\u0537\x03\x02\x02\x02\u0128" +
		"\u053A\x03\x02\x02\x02\u012A\u054B\x03\x02\x02\x02\u012C\u054D\x03\x02" +
		"\x02\x02\u012E\u0557\x03\x02\x02\x02\u0130\u0564\x03\x02\x02\x02\u0132" +
		"\u0567\x03\x02\x02\x02\u0134\u056C\x03\x02\x02\x02\u0136\u0579\x03\x02" +
		"\x02\x02\u0138\u0584\x03\x02\x02\x02\u013A\u058D\x03\x02\x02\x02\u013C" +
		"\u0590\x03\x02\x02\x02\u013E\u05A1\x03\x02\x02\x02\u0140\u05A3\x03\x02" +
		"\x02\x02\u0142\u05A7\x03\x02\x02\x02\u0144\u0146\x05\xECw\x02\u0145\u0144" +
		"\x03\x02\x02\x02\u0146\u0149\x03\x02\x02\x02\u0147\u0145\x03\x02\x02\x02" +
		"\u0147\u0148\x03\x02\x02\x02\u0148\u014B\x03\x02\x02\x02\u0149\u0147\x03" +
		"\x02\x02\x02\u014A\u014C\x05\x04\x03\x02\u014B\u014A\x03\x02\x02\x02\u014C" +
		"\u014D\x03\x02\x02\x02\u014D\u014B\x03\x02\x02\x02\u014D\u014E\x03\x02" +
		"\x02\x02\u014E\u014F\x03\x02\x02\x02\u014F\u0150\x07\x02\x02\x03\u0150" +
		"\x03\x03\x02\x02\x02\u0151\u0176\x05\u013A\x9E\x02\u0152\u0153\x05T+\x02" +
		"\u0153\u0154\x07\r\x02\x02\u0154\u0177\x03\x02\x02\x02\u0155\u0156\x05" +
		"8\x1D\x02\u0156\u0157\x07\r\x02\x02\u0157\u0177\x03\x02\x02\x02\u0158" +
		"\u0159\x05\xD0i\x02\u0159\u015A\x07\r\x02\x02\u015A\u0177\x03\x02\x02" +
		"\x02\u015B\u015C\x05\b\x05\x02\u015C\u015D\x07\r\x02\x02\u015D\u0177\x03" +
		"\x02\x02\x02\u015E\u015F\x05\x06\x04\x02\u015F\u0160\x07\r\x02\x02\u0160" +
		"\u0177\x03\x02\x02\x02\u0161\u0162\x05\x1C\x0F\x02\u0162\u0163\x07\r\x02" +
		"\x02\u0163\u0177\x03\x02\x02\x02\u0164\u0165\x05\xF0y\x02\u0165\u0166" +
		"\x07\r\x02\x02\u0166\u0177\x03\x02\x02\x02\u0167\u0168\x05\xF2z\x02\u0168" +
		"\u0169\x07\r\x02\x02\u0169\u0177\x03\x02\x02\x02\u016A\u016B\x05\u0130" +
		"\x99\x02\u016B\u016C\x07\r\x02\x02\u016C\u0177\x03\x02\x02\x02\u016D\u016E" +
		"\x05\u0104\x83\x02\u016E\u016F\x07\r\x02\x02\u016F\u0177\x03\x02\x02\x02" +
		"\u0170\u0171\x05\u0120\x91\x02\u0171\u0172\x07\r\x02\x02\u0172\u0177\x03" +
		"\x02\x02\x02\u0173\u0174\x05\x92J\x02\u0174\u0175\x07\r\x02\x02\u0175" +
		"\u0177\x03\x02\x02\x02\u0176\u0152\x03\x02\x02\x02\u0176\u0155\x03\x02" +
		"\x02\x02\u0176\u0158\x03\x02\x02\x02\u0176\u015B\x03\x02\x02\x02\u0176" +
		"\u015E\x03\x02\x02\x02\u0176\u0161\x03\x02\x02\x02\u0176\u0164\x03\x02" +
		"\x02\x02\u0176\u0167\x03\x02\x02\x02\u0176\u016A\x03\x02\x02\x02\u0176" +
		"\u016D\x03\x02\x02\x02\u0176\u0170\x03\x02\x02\x02\u0176\u0173\x03\x02" +
		"\x02\x02\u0177\x05\x03\x02\x02\x02\u0178\u0179\x07L\x02\x02\u0179\u017A" +
		"\x05\u0142\xA2\x02\u017A\u017C\x07\x10\x02\x02\u017B\u017D\x05\x04\x03" +
		"\x02\u017C\u017B\x03\x02\x02\x02\u017D\u017E\x03\x02\x02\x02\u017E\u017C" +
		"\x03\x02\x02\x02\u017E\u017F\x03\x02\x02\x02\u017F\u0180\x03\x02\x02\x02" +
		"\u0180\u0181\x07\x11\x02\x02\u0181\x07\x03\x02\x02\x02\u0182\u0185\x05" +
		"\u013A\x9E\x02\u0183\u0186\x05\n\x06\x02\u0184\u0186\x05\f\x07\x02\u0185" +
		"\u0183\x03\x02\x02\x02\u0185\u0184\x03\x02\x02\x02\u0186\t\x03\x02\x02" +
		"\x02\u0187\u0188\x05\x0E\b\x02\u0188\u0189\x07\x10\x02\x02\u0189\u018A" +
		"\x05\x10\t\x02\u018A\u018B\x07\x11\x02\x02\u018B\v\x03\x02\x02\x02\u018C" +
		"\u018E\t\x02\x02\x02\u018D\u018C\x03\x02\x02\x02\u018D\u018E\x03\x02\x02" +
		"\x02\u018E\u018F\x03\x02\x02\x02\u018F\u0190\x07c\x02\x02\u0190\u0191" +
		"\x05\u0142\xA2\x02\u0191\r\x03\x02\x02\x02\u0192\u0194\t\x02\x02\x02\u0193" +
		"\u0192\x03\x02\x02\x02\u0193";
	private static readonly _serializedATNSegment1: string =
		"\u0194\x03\x02\x02\x02\u0194\u0195\x03\x02\x02\x02\u0195\u0196\x07c\x02" +
		"\x02\u0196\u0198\x05\u0142\xA2\x02\u0197\u0199\x05\x14\v\x02\u0198\u0197" +
		"\x03\x02\x02\x02\u0198\u0199\x03\x02\x02\x02\u0199\x0F\x03\x02\x02\x02" +
		"\u019A\u019C\x05\x12\n\x02\u019B\u019A\x03\x02\x02\x02\u019C\u019F\x03" +
		"\x02\x02\x02\u019D\u019B\x03\x02\x02\x02\u019D\u019E\x03\x02\x02\x02\u019E" +
		"\x11\x03\x02\x02\x02\u019F\u019D\x03\x02\x02\x02\u01A0\u01B6\x05\u013A" +
		"\x9E\x02\u01A1\u01A2\x05T+\x02\u01A2\u01A3\x07\r\x02\x02\u01A3\u01B7\x03" +
		"\x02\x02\x02\u01A4\u01A5\x058\x1D\x02\u01A5\u01A6\x07\r\x02\x02\u01A6" +
		"\u01B7\x03\x02\x02\x02\u01A7\u01A8\x05\xD0i\x02\u01A8\u01A9\x07\r\x02" +
		"\x02\u01A9\u01B7\x03\x02\x02\x02\u01AA\u01AB\x05\xCEh\x02\u01AB\u01AC" +
		"\x07\r\x02\x02\u01AC\u01B7\x03\x02\x02\x02\u01AD\u01AE\x05\xD2j\x02\u01AE" +
		"\u01AF\x07\r\x02\x02\u01AF\u01B7\x03\x02\x02\x02\u01B0\u01B1\x05\xF0y" +
		"\x02\u01B1\u01B2\x07\r\x02\x02\u01B2\u01B7\x03\x02\x02\x02\u01B3\u01B4" +
		"\x05\xF2z\x02\u01B4\u01B5\x07\r\x02\x02\u01B5\u01B7\x03\x02\x02\x02\u01B6" +
		"\u01A1\x03\x02\x02\x02\u01B6\u01A4\x03\x02\x02\x02\u01B6\u01A7\x03\x02" +
		"\x02\x02\u01B6\u01AA\x03\x02\x02\x02\u01B6\u01AD\x03\x02\x02\x02\u01B6" +
		"\u01B0\x03\x02\x02\x02\u01B6\u01B3\x03\x02\x02\x02\u01B7\x13\x03\x02\x02" +
		"\x02\u01B8\u01B9\x07\x0E\x02\x02\u01B9\u01BE\x05\x16\f\x02\u01BA\u01BB" +
		"\x07\x0F\x02\x02\u01BB\u01BD\x05\x16\f\x02\u01BC\u01BA\x03\x02\x02\x02" +
		"\u01BD\u01C0\x03\x02\x02\x02\u01BE\u01BC\x03\x02\x02\x02\u01BE\u01BF\x03" +
		"\x02\x02\x02\u01BF\x15\x03\x02\x02\x02\u01C0\u01BE\x03\x02\x02\x02\u01C1" +
		"\u01C2\x05\x18\r\x02\u01C2\x17\x03\x02\x02\x02\u01C3\u01C4\x05\u013A\x9E" +
		"\x02\u01C4\u01C5\x05\x1A\x0E\x02\u01C5\x19\x03\x02\x02\x02\u01C6\u01C8" +
		"\x07\"\x02\x02\u01C7\u01C6\x03\x02\x02\x02\u01C7\u01C8\x03\x02\x02\x02" +
		"\u01C8\u01C9\x03\x02\x02\x02\u01C9\u01CE\x07s\x02\x02\u01CA\u01CB\x07" +
		"\"\x02\x02\u01CB\u01CD\x07s\x02\x02\u01CC\u01CA\x03\x02\x02\x02\u01CD" +
		"\u01D0\x03\x02\x02\x02\u01CE\u01CC\x03\x02\x02\x02\u01CE\u01CF\x03\x02" +
		"\x02\x02\u01CF\x1B\x03\x02\x02\x02\u01D0\u01CE\x03\x02\x02\x02\u01D1\u01D6" +
		"\x05\u013A\x9E\x02\u01D2\u01D7\x05$\x13\x02\u01D3\u01D7\x05\"\x12\x02" +
		"\u01D4\u01D7\x05 \x11\x02\u01D5\u01D7\x05\x1E\x10\x02\u01D6\u01D2\x03" +
		"\x02\x02\x02\u01D6\u01D3\x03\x02\x02\x02\u01D6\u01D4\x03\x02\x02\x02\u01D6" +
		"\u01D5\x03\x02\x02\x02\u01D7\x1D\x03\x02\x02\x02\u01D8\u01DA\x07Y\x02" +
		"\x02\u01D9\u01D8\x03\x02\x02\x02\u01D9\u01DA\x03\x02\x02\x02\u01DA\u01DB" +
		"\x03\x02\x02\x02\u01DB\u01DC\x07J\x02\x02\u01DC\u01DD\x05\u0142\xA2\x02" +
		"\u01DD\x1F\x03\x02\x02\x02\u01DE\u01DF\x07J\x02\x02\u01DF\u01E0\x05\u0142" +
		"\xA2\x02\u01E0\u01E1\x05X-\x02\u01E1!\x03\x02\x02\x02\u01E2\u01E3\x07" +
		"Y\x02\x02\u01E3\u01E4\x07J\x02\x02\u01E4\u01E5\x05\u0142\xA2\x02\u01E5" +
		"\u01E6\x05(\x15\x02\u01E6\u01EA\x07\x10\x02\x02\u01E7\u01E9\x05\x12\n" +
		"\x02\u01E8\u01E7\x03\x02\x02\x02\u01E9\u01EC\x03\x02\x02\x02\u01EA\u01E8" +
		"\x03\x02\x02\x02\u01EA\u01EB\x03\x02\x02\x02\u01EB\u01ED\x03\x02\x02\x02" +
		"\u01EC\u01EA\x03\x02\x02\x02\u01ED\u01EE\x07\x11\x02\x02\u01EE#\x03\x02" +
		"\x02\x02\u01EF\u01F0\x05&\x14\x02\u01F0\u01F4\x07\x10\x02\x02\u01F1\u01F3" +
		"\x05,\x17\x02\u01F2\u01F1\x03\x02\x02\x02\u01F3\u01F6\x03\x02\x02\x02" +
		"\u01F4\u01F2\x03\x02\x02\x02\u01F4\u01F5\x03\x02\x02\x02\u01F5\u01F7\x03" +
		"\x02\x02\x02\u01F6\u01F4\x03\x02\x02\x02\u01F7\u01F8\x07\x11\x02\x02\u01F8" +
		"%\x03\x02\x02\x02\u01F9\u01FB\x07/\x02\x02\u01FA\u01F9\x03\x02\x02\x02" +
		"\u01FA\u01FB\x03\x02\x02\x02\u01FB\u01FC\x03\x02\x02\x02\u01FC\u01FD\x07" +
		"J\x02\x02\u01FD\u01FE\x05\u0142\xA2\x02\u01FE\u01FF\x05(\x15\x02\u01FF" +
		"\'\x03\x02\x02\x02\u0200\u0202\x07\x0E\x02\x02\u0201\u0203\x07N\x02\x02" +
		"\u0202\u0201\x03\x02\x02\x02\u0202\u0203\x03\x02\x02\x02\u0203\u0204\x03" +
		"\x02\x02\x02\u0204\u0209\x05*\x16\x02\u0205\u0206\x07\x0F\x02\x02\u0206" +
		"\u0208\x05*\x16\x02\u0207\u0205\x03\x02\x02\x02\u0208\u020B\x03\x02\x02" +
		"\x02\u0209\u0207\x03\x02\x02\x02\u0209\u020A\x03\x02\x02\x02\u020A\u020D" +
		"\x03\x02\x02\x02\u020B\u0209\x03\x02\x02\x02\u020C\u0200\x03\x02\x02\x02" +
		"\u020C\u020D\x03\x02\x02\x02\u020D\u0217\x03\x02\x02\x02\u020E\u020F\x07" +
		"K\x02\x02\u020F\u0214\x05\x16\f\x02\u0210\u0211\x07\x0F\x02\x02\u0211" +
		"\u0213\x05\x16\f\x02\u0212\u0210\x03\x02\x02\x02\u0213\u0216\x03\x02\x02" +
		"\x02\u0214\u0212\x03\x02\x02\x02\u0214\u0215\x03\x02\x02\x02\u0215\u0218" +
		"\x03\x02\x02\x02\u0216\u0214\x03\x02\x02\x02\u0217\u020E\x03\x02\x02\x02" +
		"\u0217\u0218\x03\x02\x02\x02\u0218)\x03\x02\x02\x02\u0219\u021A\x05\x18" +
		"\r\x02\u021A+\x03\x02\x02\x02\u021B\u021F\x05\x12\n\x02\u021C\u021F\x05" +
		".\x18\x02\u021D\u021F\x050\x19\x02\u021E\u021B\x03\x02\x02\x02\u021E\u021C" +
		"\x03\x02\x02\x02\u021E\u021D\x03\x02\x02\x02\u021F-\x03\x02\x02\x02\u0220" +
		"\u0225\x05\u013A\x9E\x02\u0221\u0222\x07>\x02\x02\u0222\u0226\x05\u013A" +
		"\x9E\x02\u0223\u0224\x079\x02\x02\u0224\u0226\x05\u013A\x9E\x02\u0225" +
		"\u0221\x03\x02\x02\x02\u0225\u0223\x03\x02\x02\x02\u0226\u0227\x03\x02" +
		"\x02\x02\u0227\u0228\x05X-\x02\u0228\u0229\x05f4\x02\u0229\u022A\x07\r" +
		"\x02\x02\u022A/\x03\x02\x02\x02\u022B\u022C\x05\u013A\x9E\x02\u022C\u022D" +
		"\x07E\x02\x02\u022D\u022E\x05\u0142\xA2\x02\u022E\u0230\x07\x12\x02\x02" +
		"\u022F\u0231\x052\x1A\x02\u0230\u022F\x03\x02\x02\x02\u0230\u0231\x03" +
		"\x02\x02\x02\u0231\u0232\x03\x02\x02\x02\u0232\u0234\x07\x13\x02\x02\u0233" +
		"\u0235\x05\xDEp\x02\u0234\u0233\x03\x02\x02\x02\u0234\u0235\x03\x02\x02" +
		"\x02\u0235\u0236\x03\x02\x02\x02\u0236\u0237\x07\r\x02\x02\u02371\x03" +
		"\x02\x02\x02\u0238\u023D\x054\x1B\x02\u0239\u023A\x07\x0F\x02\x02\u023A" +
		"\u023C\x054\x1B\x02\u023B\u0239\x03\x02\x02\x02\u023C\u023F\x03\x02\x02" +
		"\x02\u023D\u023B\x03\x02\x02\x02\u023D\u023E\x03\x02\x02\x02\u023E3\x03" +
		"\x02\x02\x02\u023F\u023D\x03\x02\x02\x02\u0240\u0241\x05\u013A\x9E\x02" +
		"\u0241\u0242\x056\x1C\x02\u0242\u0243\x05\u013A\x9E\x02\u0243\u0244\x05" +
		"\xE2r\x02\u0244\u0245\x05\u013A\x9E\x02\u0245\u0246\x05j6\x02\u02465\x03" +
		"\x02\x02\x02\u0247\u0248\x07<\x02\x02\u02487\x03\x02\x02\x02\u0249\u024A" +
		"\x07H\x02\x02\u024A\u024B\x05:\x1E\x02\u024B\u024C\x05\u0142\xA2\x02\u024C" +
		"\u024D\x07 \x02\x02\u024D\u024E\x05<\x1F\x02\u024E9\x03\x02\x02\x02\u024F" +
		"\u025A\x05\u013A\x9E\x02\u0250\u025B\x05p9\x02\u0251\u025B\x05\x86D\x02" +
		"\u0252\u025B\x05\x88E\x02\u0253\u025B\x05\x8AF\x02\u0254\u025B\x05n8\x02" +
		"\u0255\u025B\x05\xC6d\x02\u0256\u025B\x05\xC8e\x02\u0257\u025B\x05\xE6" +
		"t\x02\u0258\u025B\x05\x1A\x0E\x02\u0259\u025B\x05\x8CG\x02\u025A\u0250" +
		"\x03\x02\x02\x02\u025A\u0251\x03\x02\x02\x02\u025A\u0252\x03\x02\x02\x02" +
		"\u025A\u0253\x03\x02\x02\x02\u025A\u0254\x03\x02\x02\x02\u025A\u0255\x03" +
		"\x02\x02\x02\u025A\u0256\x03\x02\x02\x02\u025A\u0257\x03\x02\x02\x02\u025A" +
		"\u0258\x03\x02\x02\x02\u025A\u0259\x03\x02\x02\x02\u025B;\x03\x02\x02" +
		"\x02\u025C\u025D\x05> \x02\u025D=\x03\x02\x02\x02\u025E\u0263\x05@!\x02" +
		"\u025F\u0260\x07\x1F\x02\x02\u0260\u0262\x05@!\x02\u0261\u025F\x03\x02" +
		"\x02\x02\u0262\u0265\x03\x02\x02\x02\u0263\u0261\x03\x02\x02\x02\u0263" +
		"\u0264\x03\x02\x02\x02\u0264?\x03\x02\x02\x02\u0265\u0263\x03\x02\x02" +
		"\x02\u0266\u026B\x05B\"\x02\u0267\u0268\x07\x1D\x02\x02\u0268\u026A\x05" +
		"B\"\x02\u0269\u0267\x03\x02\x02\x02\u026A\u026D\x03\x02\x02\x02\u026B" +
		"\u0269\x03\x02\x02\x02\u026B\u026C\x03\x02\x02\x02\u026CA\x03\x02\x02" +
		"\x02\u026D\u026B\x03\x02\x02\x02\u026E\u0273\x05D#\x02\u026F\u0270\x07" +
		"\x1E\x02\x02\u0270\u0272\x05D#\x02\u0271\u026F\x03\x02\x02\x02\u0272\u0275" +
		"\x03\x02\x02\x02\u0273\u0271\x03\x02\x02\x02\u0273\u0274\x03\x02\x02\x02" +
		"\u0274C\x03\x02\x02\x02\u0275\u0273\x03\x02\x02\x02\u0276\u027B\x05F$" +
		"\x02\u0277\u0278\t\x03\x02\x02\u0278\u027A\x05F$\x02\u0279\u0277\x03\x02" +
		"\x02\x02\u027A\u027D\x03\x02\x02\x02\u027B\u0279\x03\x02\x02\x02\u027B" +
		"\u027C\x03\x02\x02\x02\u027CE\x03\x02\x02\x02\u027D\u027B\x03\x02\x02" +
		"\x02\u027E\u0283\x05H%\x02\u027F\u0280\t\x04\x02\x02\u0280\u0282\x05H" +
		"%\x02\u0281\u027F\x03\x02\x02\x02\u0282\u0285\x03\x02\x02\x02\u0283\u0281" +
		"\x03\x02\x02\x02\u0283\u0284\x03\x02\x02\x02\u0284G\x03\x02\x02\x02\u0285" +
		"\u0283\x03\x02\x02\x02\u0286\u028B\x05J&\x02\u0287\u0288\t\x05\x02\x02" +
		"\u0288\u028A\x05J&\x02\u0289\u0287\x03\x02\x02\x02\u028A\u028D\x03\x02" +
		"\x02\x02\u028B\u0289\x03\x02\x02\x02\u028B\u028C\x03\x02\x02\x02\u028C" +
		"I\x03\x02\x02\x02\u028D\u028B\x03\x02\x02\x02\u028E\u028F\x05L\'\x02\u028F" +
		"\u0290\x05N(\x02\u0290\u0293\x03\x02\x02\x02\u0291\u0293\x05N(\x02\u0292" +
		"\u028E\x03\x02\x02\x02\u0292\u0291\x03\x02\x02\x02\u0293K\x03\x02\x02" +
		"\x02\u0294\u0295\t\x06\x02\x02\u0295M\x03\x02\x02\x02\u0296\u029D\x05" +
		"\x1A\x0E\x02\u0297\u029D\x05P)\x02\u0298\u0299\x07\x12\x02\x02\u0299\u029A" +
		"\x05<\x1F\x02\u029A\u029B\x07\x13\x02\x02\u029B\u029D\x03\x02\x02\x02" +
		"\u029C\u0296\x03\x02\x02\x02\u029C\u0297\x03\x02\x02\x02\u029C\u0298\x03" +
		"\x02\x02\x02\u029DO\x03\x02\x02\x02\u029E\u029F\t\x07\x02\x02\u029FQ\x03" +
		"\x02\x02\x02\u02A0\u02A1\x05<\x1F\x02\u02A1S\x03\x02\x02\x02\u02A2\u02A3" +
		"\x07,\x02\x02\u02A3\u02A4\x05\u013A\x9E\x02\u02A4\u02A5\x05V,\x02\u02A5" +
		"\u02B1\x03\x02\x02\x02\u02A6\u02B1\x05\xAAV\x02\u02A7\u02B1\x05\xB0Y\x02" +
		"\u02A8\u02B1\x05\xBC_\x02\u02A9\u02B1\x05\xA0Q\x02\u02AA\u02B1\x05\xA6" +
		"T\x02\u02AB\u02AC\x074\x02\x02\u02AC\u02AD\x05\u013A\x9E\x02\u02AD\u02AE" +
		"\x05j6\x02\u02AE\u02B1\x03\x02\x02\x02\u02AF\u02B1\x05\xEAv\x02\u02B0" +
		"\u02A2\x03\x02\x02\x02\u02B0\u02A6\x03\x02\x02\x02\u02B0\u02A7\x03\x02" +
		"\x02\x02\u02B0\u02A8\x03\x02\x02\x02\u02B0\u02A9\x03\x02\x02\x02\u02B0" +
		"\u02AA\x03\x02\x02\x02\u02B0\u02AB\x03\x02\x02\x02\u02B0\u02AF\x03\x02" +
		"\x02\x02\u02B1U\x03\x02\x02\x02\u02B2\u02B3\x05X-\x02\u02B3\u02B4\x05" +
		"f4\x02\u02B4W\x03\x02\x02\x02\u02B5\u02B8\x05Z.\x02\u02B6\u02B8\x05b2" +
		"\x02\u02B7\u02B5\x03\x02\x02\x02\u02B7\u02B6\x03\x02\x02\x02\u02B8Y\x03" +
		"\x02\x02\x02\u02B9\u02BD\x05^0\x02\u02BA\u02BD\x05`1\x02\u02BB\u02BD\x05" +
		"\x1A\x0E\x02\u02BC\u02B9\x03\x02\x02\x02\u02BC\u02BA\x03\x02\x02\x02\u02BC" +
		"\u02BB\x03\x02\x02\x02\u02BD[\x03\x02\x02\x02\u02BE\u02C2\x05p9\x02\u02BF" +
		"\u02C2\x05\x8AF\x02\u02C0\u02C2\x05\x8CG\x02\u02C1\u02BE\x03\x02\x02\x02" +
		"\u02C1\u02BF\x03\x02\x02\x02\u02C1\u02C0\x03\x02\x02\x02\u02C2]\x03\x02" +
		"\x02\x02\u02C3\u02CD\x05n8\x02\u02C4\u02CD\x05p9\x02\u02C5\u02CD\x05\x86" +
		"D\x02\u02C6\u02CD\x05\x88E\x02\u02C7\u02CD\x05\x8AF\x02\u02C8\u02CD\x05" +
		"\x8CG\x02\u02C9\u02CD\x05\x8EH\x02\u02CA\u02CD\x05\x90I\x02\u02CB\u02CD" +
		"\x05\xE8u\x02\u02CC\u02C3\x03\x02\x02\x02\u02CC\u02C4\x03\x02\x02\x02" +
		"\u02CC\u02C5\x03\x02\x02\x02\u02CC\u02C6\x03\x02\x02\x02\u02CC\u02C7\x03" +
		"\x02\x02\x02\u02CC\u02C8\x03\x02\x02\x02\u02CC\u02C9\x03\x02\x02\x02\u02CC" +
		"\u02CA\x03\x02\x02\x02\u02CC\u02CB\x03\x02\x02\x02\u02CD_\x03\x02\x02" +
		"\x02\u02CE\u02D5\x05\xC0a\x02\u02CF\u02D5\x05\xC2b\x02\u02D0\u02D5\x05" +
		"\xC4c\x02\u02D1\u02D5\x05\xC6d\x02\u02D2\u02D5\x05\xC8e\x02\u02D3\u02D5" +
		"\x05\xE4s\x02\u02D4\u02CE\x03\x02\x02\x02\u02D4\u02CF\x03\x02\x02\x02" +
		"\u02D4\u02D0\x03\x02\x02\x02\u02D4\u02D1\x03\x02\x02\x02\u02D4\u02D2\x03" +
		"\x02\x02\x02\u02D4\u02D3\x03\x02\x02\x02\u02D5a\x03\x02\x02\x02\u02D6" +
		"\u02DC\x05\xAAV\x02\u02D7\u02DC\x05\xB0Y\x02\u02D8\u02DC\x05\xBC_\x02" +
		"\u02D9\u02DC\x05\xA0Q\x02\u02DA\u02DC\x05\xA6T\x02\u02DB\u02D6\x03\x02" +
		"\x02\x02\u02DB\u02D7\x03\x02\x02\x02\u02DB\u02D8\x03\x02\x02\x02\u02DB" +
		"\u02D9\x03\x02\x02\x02\u02DB\u02DA\x03\x02\x02\x02\u02DCc\x03\x02\x02" +
		"\x02\u02DD\u02E2\x05\u0142\xA2\x02\u02DE\u02DF\x07\x0F\x02\x02\u02DF\u02E1" +
		"\x05\u0142\xA2\x02\u02E0\u02DE\x03\x02\x02\x02\u02E1\u02E4\x03\x02\x02" +
		"\x02\u02E2\u02E0\x03\x02\x02\x02\u02E2\u02E3\x03\x02\x02\x02\u02E3e\x03" +
		"\x02\x02\x02\u02E4\u02E2\x03\x02\x02\x02\u02E5\u02EA\x05h5\x02\u02E6\u02E7" +
		"\x07\x0F\x02\x02\u02E7\u02E9\x05h5\x02\u02E8\u02E6\x03\x02\x02\x02\u02E9" +
		"\u02EC\x03\x02\x02\x02\u02EA\u02E8\x03\x02\x02\x02\u02EA\u02EB\x03\x02" +
		"\x02\x02\u02EBg\x03\x02\x02\x02\u02EC\u02EA\x03\x02\x02\x02\u02ED\u02F0" +
		"\x05\u013A\x9E\x02\u02EE\u02F1\x05j6\x02\u02EF\u02F1\x05l7\x02\u02F0\u02EE" +
		"\x03\x02\x02\x02\u02F0\u02EF\x03\x02\x02\x02\u02F1i\x03\x02\x02\x02\u02F2" +
		"\u02F3\x07s\x02\x02\u02F3k\x03\x02\x02\x02\u02F4\u02F5\x05\xCAf\x02\u02F5" +
		"m\x03\x02\x02\x02\u02F6\u02FB\x07V\x02\x02\u02F7\u02FB\x07]\x02\x02\u02F8" +
		"\u02F9\x07@\x02\x02\u02F9\u02FB\x07]\x02\x02\u02FA\u02F6\x03\x02\x02\x02" +
		"\u02FA\u02F7\x03\x02\x02\x02\u02FA\u02F8\x03\x02\x02\x02\u02FBo\x03\x02" +
		"\x02\x02\u02FC\u02FF\x05r:\x02\u02FD\u02FF\x05|?\x02\u02FE\u02FC\x03\x02" +
		"\x02\x02\u02FE\u02FD\x03\x02\x02\x02\u02FFq\x03\x02\x02\x02\u0300\u0305" +
		"\x05v<\x02\u0301\u0305\x05x=\x02\u0302\u0305\x05z>\x02\u0303\u0305\x05" +
		"t;\x02\u0304\u0300\x03\x02\x02\x02\u0304\u0301\x03\x02\x02\x02\u0304\u0302" +
		"\x03\x02\x02\x02\u0304\u0303\x03\x02\x02\x02\u0305s\x03\x02\x02\x02\u0306" +
		"\u0307\x07j\x02\x02\u0307u\x03\x02\x02\x02\u0308\u0309\t\b\x02\x02\u0309" +
		"w\x03\x02\x02\x02\u030A\u030B\t\t\x02\x02\u030By\x03\x02\x02\x02\u030C" +
		"\u030D\x07@\x02\x02\u030D\u0310\x07@\x02\x02\u030E\u0310\x07p\x02\x02" +
		"\u030F\u030C\x03\x02\x02\x02\u030F\u030E\x03\x02\x02\x02\u0310{\x03\x02" +
		"\x02\x02\u0311\u0316\x05\x80A\x02\u0312\u0316\x05\x82B\x02\u0313\u0316" +
		"\x05\x84C\x02\u0314\u0316\x05~@\x02\u0315\u0311\x03\x02\x02\x02\u0315" +
		"\u0312\x03\x02\x02\x02\u0315\u0313\x03\x02\x02\x02\u0315\u0314\x03\x02" +
		"\x02\x02\u0316}\x03\x02\x02\x02\u0317\u0318\x07k\x02\x02\u0318\x7F\x03" +
		"\x02\x02\x02\u0319\u031A\x07O\x02\x02\u031A\u031D\x07?\x02\x02\u031B\u031D" +
		"\x07m\x02\x02\u031C\u0319\x03\x02\x02\x02\u031C\u031B\x03\x02\x02\x02" +
		"\u031D\x81\x03\x02\x02\x02\u031E\u031F\x07O\x02\x02\u031F\u0322\x07@\x02" +
		"\x02\u0320\u0322\x07o\x02\x02\u0321\u031E\x03\x02\x02\x02\u0321\u0320" +
		"\x03\x02\x02\x02\u0322\x83\x03\x02\x02\x02\u0323\u0324\x07O\x02\x02\u0324" +
		"\u0325\x07@\x02\x02\u0325\u0328\x07@\x02\x02\u0326\u0328\x07q\x02\x02" +
		"\u0327\u0323\x03\x02\x02\x02\u0327\u0326\x03\x02\x02\x02\u0328\x85\x03" +
		"\x02\x02\x02\u0329\u032A\x07T\x02\x02\u032A\x87\x03\x02\x02\x02\u032B" +
		"\u032C\x07;\x02\x02\u032C\x89\x03\x02\x02\x02\u032D\u032E\x07W\x02\x02" +
		"\u032E\x8B\x03\x02\x02\x02\u032F\u0330\x070\x02\x02\u0330\x8D\x03\x02" +
		"\x02\x02\u0331\u0332\x07S\x02\x02\u0332\x8F\x03\x02\x02\x02\u0333\u0334" +
		"\x07M\x02\x02\u0334\x91\x03\x02\x02\x02\u0335\u0338\x05\x94K\x02\u0336" +
		"\u0338\x05\x9EP\x02\u0337\u0335\x03\x02\x02\x02\u0337\u0336\x03\x02\x02" +
		"\x02\u0338\x93\x03\x02\x02\x02\u0339\u033A\x05\x96L\x02\u033A\u033B\x07" +
		"\x10\x02\x02\u033B\u033C\x05\x9AN\x02\u033C\u033D\x07\x11\x02\x02\u033D" +
		"\x95\x03\x02\x02\x02\u033E\u033F\x07r\x02\x02\u033F\u0341\x05\u0142\xA2" +
		"\x02\u0340\u0342\x05\x98M\x02\u0341\u0340\x03\x02\x02\x02\u0341\u0342" +
		"\x03\x02\x02\x02\u0342\x97\x03\x02\x02\x02\u0343\u0344\x07\x0E\x02\x02" +
		"\u0344\u0345\x05\x1A\x0E\x02\u0345\x99\x03\x02\x02\x02\u0346\u0352\x05" +
		"\x9CO\x02\u0347\u0348\x05\xBC_\x02\u0348\u0349\x07\r\x02\x02\u0349\u0352" +
		"\x03\x02\x02\x02\u034A\u034B\x058\x1D\x02\u034B\u034C\x07\r\x02\x02\u034C" +
		"\u0352\x03\x02\x02\x02\u034D\u034E\x07,\x02\x02\u034E\u034F\x05V,\x02" +
		"\u034F\u0350\x07\r\x02\x02\u0350\u0352\x03\x02\x02\x02\u0351\u0346\x03" +
		"\x02\x02\x02\u0351\u0347\x03\x02\x02\x02\u0351\u034A\x03\x02\x02\x02\u0351" +
		"\u034D\x03\x02\x02\x02\u0352\u0355\x03\x02\x02\x02\u0353\u0351\x03\x02" +
		"\x02\x02\u0353\u0354\x03\x02\x02\x02\u0354\x9B\x03\x02\x02\x02\u0355\u0353" +
		"\x03\x02\x02\x02\u0356\u0357\x05:\x1E\x02\u0357\u035A\x05j6\x02\u0358" +
		"\u0359\x07=\x02\x02\u0359\u035B\x05<\x1F\x02\u035A\u0358\x03\x02\x02\x02" +
		"\u035A\u035B\x03\x02\x02\x02\u035B\u035C\x03\x02\x02\x02\u035C\u035D\x07" +
		"\r\x02\x02\u035D\x9D\x03\x02\x02\x02\u035E\u035F\x07r\x02\x02\u035F\u0360" +
		"\x05\x1A\x0E\x02\u0360\x9F\x03\x02\x02\x02\u0361\u0362\x07h\x02\x02\u0362" +
		"\u0365\x05\u0142\xA2\x02\u0363\u0364\x07\x0E\x02\x02\u0364\u0366\x05\x1A" +
		"\x0E\x02\u0365\u0363\x03\x02\x02\x02\u0365\u0366\x03\x02\x02\x02\u0366" +
		"\u0367\x03\x02\x02\x02\u0367\u0368\x07\x10\x02\x02\u0368\u0369\x05\xA2" +
		"R\x02\u0369\u036A\x07\x11\x02\x02\u036A\xA1\x03\x02\x02\x02\u036B\u036D" +
		"\x05\xA4S\x02\u036C\u036E\x05d3\x02\u036D\u036C\x03\x02\x02\x02\u036D" +
		"\u036E\x03\x02\x02\x02\u036E\u036F\x03\x02\x02\x02\u036F\u0370\x07\r\x02" +
		"\x02\u0370\u0372\x03\x02\x02\x02\u0371\u036B\x03\x02\x02\x02\u0372\u0373" +
		"\x03\x02\x02\x02\u0373\u0371\x03\x02\x02\x02\u0373\u0374\x03\x02\x02\x02" +
		"\u0374\xA3\x03\x02\x02\x02\u0375\u0376\x05\u013A\x9E\x02\u0376\u0377\x07" +
		"g\x02\x02\u0377\u0378\x07\x18\x02\x02\u0378\u037B\x05R*\x02\u0379\u037A" +
		"\x07\x0F\x02\x02\u037A\u037C\x05\\/\x02\u037B\u0379\x03\x02\x02\x02\u037B" +
		"\u037C\x03\x02\x02\x02\u037C\u037D\x03\x02\x02\x02\u037D\u037E\x07\x19" +
		"\x02\x02\u037E\xA5\x03\x02\x02\x02\u037F\u0380\x07i\x02\x02\u0380\u0381" +
		"\x05\u0142\xA2\x02\u0381\u0382\x07\x10\x02\x02\u0382\u0383\x05\xA8U\x02" +
		"\u0383\u0384\x07\x11\x02\x02\u0384\xA7\x03\x02\x02\x02\u0385\u038A\x05" +
		"\u0142\xA2\x02\u0386\u0387\x07\x0F\x02\x02\u0387\u0389\x05\u0142\xA2\x02" +
		"\u0388\u0386\x03\x02\x02\x02\u0389\u038C\x03\x02\x02\x02\u038A\u0388\x03" +
		"\x02\x02\x02\u038A\u038B\x03\x02\x02\x02\u038B\xA9\x03\x02\x02\x02\u038C" +
		"\u038A\x03\x02\x02\x02\u038D\u038E\x073\x02\x02\u038E\u0391\x05\u0142" +
		"\xA2\x02\u038F\u0390\x07\x0E\x02\x02\u0390\u0392\x05\x1A\x0E\x02\u0391" +
		"\u038F\x03\x02\x02\x02\u0391\u0392\x03\x02\x02\x02\u0392\u0393\x03\x02" +
		"\x02\x02\u0393\u0394\x07\x10\x02\x02\u0394\u0395\x05\xACW\x02\u0395\u0396" +
		"\x07\x11\x02\x02\u0396\xAB\x03\x02\x02\x02\u0397\u0399\x05\xAEX\x02\u0398" +
		"\u0397\x03\x02\x02\x02\u0399\u039C\x03\x02\x02\x02\u039A\u0398\x03\x02" +
		"\x02\x02\u039A\u039B\x03\x02\x02\x02\u039B\xAD\x03\x02\x02\x02\u039C\u039A" +
		"\x03\x02\x02\x02\u039D\u039E\x05\u013A\x9E\x02\u039E\u039F\x05X-\x02\u039F" +
		"\u03A0\x05f4\x02\u03A0\u03A1\x07\r\x02\x02\u03A1\xAF\x03\x02\x02\x02\u03A2" +
		"\u03A3\x07Q\x02\x02\u03A3\u03A4\x05\u0142\xA2\x02\u03A4\u03A5\x07*\x02" +
		"\x02\u03A5\u03A6\x07\x12\x02\x02\u03A6\u03A7\x05\u013A\x9E\x02\u03A7\u03A8" +
		"\x05\xB2Z\x02\u03A8\u03A9\x07\x13\x02\x02\u03A9\u03AA\x07\x10\x02\x02" +
		"\u03AA\u03AB\x05\xB4[\x02\u03AB\u03AC\x07\x11\x02\x02\u03AC\xB1\x03\x02" +
		"\x02\x02\u03AD\u03B5\x05p9\x02\u03AE\u03B5\x05\x86D\x02\u03AF\u03B5\x05" +
		"\x88E\x02\u03B0\u03B5\x05\x8CG\x02\u03B1\u03B5\x05\x8AF\x02\u03B2\u03B5" +
		"\x05\xBC_\x02\u03B3\u03B5\x05\x1A\x0E\x02\u03B4\u03AD\x03\x02\x02\x02" +
		"\u03B4\u03AE\x03\x02\x02\x02\u03B4\u03AF\x03\x02\x02\x02\u03B4\u03B0\x03" +
		"\x02\x02\x02\u03B4\u03B1\x03\x02\x02\x02\u03B4\u03B2\x03\x02\x02\x02\u03B4" +
		"\u03B3\x03\x02\x02\x02\u03B5\xB3\x03\x02\x02\x02\u03B6\u03B8\x05\xB6\\" +
		"\x02\u03B7\u03B6\x03\x02\x02\x02\u03B8\u03B9\x03\x02\x02\x02\u03B9\u03B7" +
		"\x03\x02\x02\x02\u03B9\u03BA\x03\x02\x02\x02\u03BA\xB5\x03\x02\x02\x02" +
		"\u03BB\u03BD\x05\xB8]\x02\u03BC\u03BB\x03\x02\x02\x02\u03BD\u03BE\x03" +
		"\x02\x02\x02\u03BE\u03BC\x03\x02\x02\x02\u03BE\u03BF\x03\x02\x02\x02\u03BF" +
		"\u03C0\x03\x02\x02\x02\u03C0\u03C1\x05\xBA^\x02\u03C1\u03C2\x07\r\x02" +
		"\x02\u03C2\xB7\x03\x02\x02\x02\u03C3\u03CA\x05\u013A\x9E\x02\u03C4\u03C5" +
		"\x07U\x02\x02\u03C5\u03C6\x05<\x1F\x02\u03C6\u03C7\x07\x0E\x02\x02\u03C7" +
		"\u03CB\x03\x02\x02\x02\u03C8\u03C9\x07=\x02\x02\u03C9\u03CB\x07\x0E\x02" +
		"\x02\u03CA\u03C4\x03\x02\x02\x02\u03CA\u03C8\x03\x02\x02\x02\u03CB\xB9" +
		"\x03\x02\x02\x02\u03CC\u03CD\x05\u013A\x9E\x02\u03CD\u03CE\x05X-\x02\u03CE" +
		"\u03CF\x05h5\x02\u03CF\xBB\x03\x02\x02\x02\u03D0\u03D1\x07A\x02\x02\u03D1" +
		"\u03D2\x05\u0142\xA2\x02\u03D2\u03D3\x07\x10\x02\x02\u03D3\u03D8\x05\xBE" +
		"`\x02\u03D4\u03D5\x07\x0F\x02\x02\u03D5\u03D7\x05\xBE`\x02\u03D6\u03D4" +
		"\x03\x02\x02\x02\u03D7\u03DA\x03\x02\x02\x02\u03D8\u03D6\x03\x02\x02\x02" +
		"\u03D8\u03D9\x03\x02\x02\x02\u03D9\u03DB\x03\x02\x02\x02\u03DA\u03D8\x03" +
		"\x02\x02\x02\u03DB\u03DC\x07\x11\x02\x02\u03DC\xBD\x03\x02\x02\x02\u03DD" +
		"\u03DE\x05\u0142\xA2\x02\u03DE\xBF\x03\x02\x02\x02\u03DF\u03E0\x071\x02" +
		"\x02\u03E0\u03E1\x07\x18\x02\x02\u03E1\u03E2\x05\u013A\x9E\x02\u03E2\u03E5" +
		"\x05Z.\x02\u03E3\u03E4\x07\x0F\x02\x02\u03E4\u03E6\x05R*\x02\u03E5\u03E3" +
		"\x03\x02\x02\x02\u03E5\u03E6\x03\x02\x02\x02\u03E6\u03E7\x03\x02\x02\x02" +
		"\u03E7\u03E8\x07\x19\x02\x02\u03E8\xC1\x03\x02\x02\x02\u03E9\u03EA\x07" +
		"e\x02\x02\u03EA\u03EB\x07\x18\x02\x02\u03EB\u03EE\x05Z.\x02\u03EC\u03ED" +
		"\x07\x0F\x02\x02\u03ED\u03EF\x05R*\x02\u03EE\u03EC\x03\x02\x02\x02\u03EE" +
		"\u03EF\x03\x02\x02\x02\u03EF\u03F0\x03\x02\x02\x02\u03F0\u03F1\x07\x19" +
		"\x02\x02\u03F1\xC3\x03\x02\x02\x02\u03F2\u03F3\x07f\x02\x02\u03F3\u03F4" +
		"\x07\x18\x02\x02\u03F4\u03F5\x05Z.\x02\u03F5\u03F6\x07\x0F\x02\x02\u03F6" +
		"\u03F9\x05Z.\x02\u03F7\u03F8\x07\x0F\x02\x02\u03F8\u03FA\x05R*\x02\u03F9" +
		"\u03F7\x03\x02\x02\x02\u03F9\u03FA\x03\x02\x02\x02\u03FA\u03FB\x03\x02" +
		"\x02\x02\u03FB\u03FC\x07\x19\x02\x02\u03FC\xC5\x03\x02\x02\x02\u03FD\u0402" +
		"\x07)\x02\x02\u03FE\u03FF\x07\x18\x02\x02\u03FF\u0400\x05R*\x02\u0400" +
		"\u0401\x07\x19\x02\x02\u0401\u0403\x03\x02\x02\x02\u0402\u03FE\x03\x02" +
		"\x02\x02\u0402\u0403\x03\x02\x02\x02\u0403\xC7\x03\x02\x02\x02\u0404\u0409" +
		"\x07B\x02\x02\u0405\u0406\x07\x18\x02\x02\u0406\u0407\x05R*\x02\u0407" +
		"\u0408\x07\x19\x02\x02\u0408\u040A\x03\x02\x02\x02\u0409\u0405\x03\x02" +
		"\x02\x02\u0409\u040A\x03\x02\x02\x02\u040A\xC9\x03\x02\x02\x02\u040B\u040D" +
		"\x07s\x02\x02\u040C\u040E\x05\xCCg\x02\u040D\u040C\x03\x02\x02\x02\u040E" +
		"\u040F\x03\x02\x02\x02\u040F\u040D\x03\x02\x02\x02\u040F\u0410\x03\x02" +
		"\x02\x02\u0410\xCB\x03\x02\x02\x02\u0411\u0412\x07\x14\x02\x02\u0412\u0413" +
		"\x05R*\x02\u0413\u0414\x07\x15\x02\x02\u0414\xCD\x03\x02\x02\x02\u0415" +
		"\u0418\x05\xF4{\x02\u0416\u0418\x05\xF8}\x02\u0417\u0415\x03\x02\x02\x02" +
		"\u0417\u0416\x03\x02\x02\x02\u0418\xCF\x03\x02\x02\x02\u0419\u041A\x07" +
		"F\x02\x02\u041A\u041B\x05\u0142\xA2\x02\u041B\u041F\x07\x10\x02\x02\u041C" +
		"\u041E\x05\xAEX\x02\u041D\u041C\x03\x02\x02\x02\u041E\u0421\x03\x02\x02" +
		"\x02\u041F\u041D\x03\x02\x02\x02\u041F\u0420\x03\x02\x02\x02\u0420\u0422" +
		"\x03\x02\x02\x02\u0421\u041F\x03\x02\x02\x02\u0422\u0423\x07\x11\x02\x02" +
		"\u0423\xD1\x03\x02\x02\x02\u0424\u0426\x05\xD4k\x02\u0425\u0424\x03\x02" +
		"\x02\x02\u0425\u0426\x03\x02\x02\x02\u0426\u0427\x03\x02\x02\x02\u0427" +
		"\u0428\x05\xD6l\x02\u0428\u0429\x05\u0142\xA2\x02\u0429\u042B\x05\xD8" +
		"m\x02\u042A\u042C\x05\xDEp\x02\u042B\u042A\x03\x02\x02\x02\u042B\u042C" +
		"\x03\x02\x02\x02\u042C\u042E\x03\x02\x02\x02\u042D\u042F\x05\xE0q\x02" +
		"\u042E\u042D\x03\x02\x02\x02\u042E\u042F\x03\x02\x02\x02\u042F\xD3\x03" +
		"\x02\x02\x02\u0430\u0431\x07R\x02\x02\u0431\xD5\x03\x02\x02\x02\u0432" +
		"\u0435\x05\u013A\x9E\x02\u0433\u0436\x05\xE2r\x02\u0434\u0436\x078\x02" +
		"\x02\u0435\u0433\x03\x02\x02\x02\u0435\u0434\x03\x02\x02\x02\u0436\xD7" +
		"\x03\x02\x02\x02\u0437\u0440\x07\x12\x02\x02\u0438\u043D\x05\xDAn\x02" +
		"\u0439\u043A\x07\x0F\x02\x02\u043A\u043C\x05\xDAn\x02\u043B\u0439\x03" +
		"\x02\x02\x02\u043C\u043F\x03\x02\x02\x02\u043D\u043B\x03\x02\x02\x02\u043D" +
		"\u043E\x03\x02\x02\x02\u043E\u0441\x03\x02\x02\x02\u043F\u043D\x03\x02" +
		"\x02\x02\u0440\u0438\x03\x02\x02\x02\u0440\u0441\x03\x02\x02\x02\u0441" +
		"\u0442\x03\x02\x02\x02\u0442\u0443\x07\x13\x02\x02\u0443\xD9\x03\x02\x02" +
		"\x02\u0444\u0445\x05\u013A\x9E\x02\u0445\u0446\x05\xDCo\x02\u0446\u0447" +
		"\x05\u013A\x9E\x02\u0447\u0448\x05\xE2r\x02\u0448\u0449\x05\u013A\x9E" +
		"\x02\u0449\u044A\x05j6\x02\u044A\xDB\x03\x02\x02\x02\u044B\u044C\t\n\x02" +
		"\x02\u044C\xDD\x03\x02\x02\x02\u044D\u044E\x077\x02\x02\u044E\u044F\x07" +
		"\x12\x02\x02\u044F\u0454\x05\x18\r\x02\u0450\u0451\x07\x0F\x02\x02\u0451" +
		"\u0453\x05\x18\r\x02\u0452\u0450\x03";
	private static readonly _serializedATNSegment2: string =
		"\x02\x02\x02\u0453\u0456\x03\x02\x02\x02\u0454\u0452\x03\x02\x02\x02\u0454" +
		"\u0455\x03\x02\x02\x02\u0455\u0457\x03\x02\x02\x02\u0456\u0454\x03\x02" +
		"\x02\x02\u0457\u0458\x07\x13\x02\x02\u0458\xDF\x03\x02\x02\x02\u0459\u045A" +
		"\x07C\x02\x02\u045A\u045B\x07\x12\x02\x02\u045B\u0460\x07\v\x02\x02\u045C" +
		"\u045D\x07\x0F\x02\x02\u045D\u045F\x07\v\x02\x02\u045E\u045C\x03\x02\x02" +
		"\x02\u045F\u0462\x03\x02\x02\x02\u0460\u045E\x03\x02\x02\x02\u0460\u0461" +
		"\x03\x02\x02\x02\u0461\u0463\x03\x02\x02\x02\u0462\u0460\x03\x02\x02\x02" +
		"\u0463\u0464\x07\x13\x02\x02\u0464\xE1\x03\x02\x02\x02\u0465\u046A\x05" +
		"^0\x02\u0466\u046A\x05\xC6d\x02\u0467\u046A\x05\xC8e\x02\u0468\u046A\x05" +
		"\x1A\x0E\x02\u0469\u0465\x03\x02\x02\x02\u0469\u0466\x03\x02\x02\x02\u0469" +
		"\u0467\x03\x02\x02\x02\u0469\u0468\x03\x02\x02\x02\u046A\xE3\x03\x02\x02" +
		"\x02\u046B\u046C\x07P\x02\x02\u046C\u046D\x07\x18\x02\x02\u046D\u046E" +
		"\x05R*\x02\u046E\u046F\x07\x0F\x02\x02\u046F\u0470\x05R*\x02\u0470\u0471" +
		"\x07\x19\x02\x02\u0471\xE5\x03\x02\x02\x02\u0472\u0473\x07P\x02\x02\u0473" +
		"\xE7\x03\x02\x02\x02\u0474\u0475\x07I\x02\x02\u0475\xE9\x03\x02\x02\x02" +
		"\u0476\u0477\x073\x02\x02\u0477\u047B\x07s\x02\x02\u0478\u0479\x07Q\x02" +
		"\x02\u0479\u047B\x07s\x02\x02\u047A\u0476\x03\x02\x02\x02\u047A\u0478" +
		"\x03\x02\x02\x02\u047B\xEB\x03\x02\x02\x02\u047C\u047D\x05\u013A\x9E\x02" +
		"\u047D\u047E\x072\x02\x02\u047E\u047F\x05\u013A\x9E\x02\u047F\u0480\x05" +
		"\xEEx\x02\u0480\u0481\x07\r\x02\x02\u0481\xED\x03\x02\x02\x02\u0482\u0485" +
		"\x05\x1A\x0E\x02\u0483\u0485\x07\v\x02\x02\u0484\u0482\x03\x02\x02\x02" +
		"\u0484\u0483\x03\x02\x02\x02\u0485\xEF\x03\x02\x02\x02\u0486\u0487\x07" +
		"_\x02\x02\u0487\u0488\x05\x18\r\x02\u0488\u0489\x07\v\x02\x02\u0489\xF1" +
		"\x03\x02\x02\x02\u048A\u048B\x07^\x02\x02\u048B\u048C\x05\x18\r\x02\u048C" +
		"\u048D\x07\v\x02\x02\u048D\xF3\x03\x02\x02\x02\u048E\u048F\x075\x02\x02" +
		"\u048F\u0490\x07`\x02\x02\u0490\u0491\x05\u013A\x9E\x02\u0491\u0492\x05" +
		"\xE2r\x02\u0492\u0493\x05\xF6|\x02\u0493\xF5\x03\x02\x02\x02\u0494\u0495" +
		"\x05\u013A\x9E\x02\u0495\u04A0\x05j6\x02\u0496\u04A1\x05\xDEp\x02\u0497" +
		"\u0498\x07\x0F\x02\x02\u0498\u0499\x05\u013A\x9E\x02\u0499\u049A\x05j" +
		"6\x02\u049A\u049C\x03\x02\x02\x02\u049B\u0497\x03\x02\x02\x02\u049C\u049F" +
		"\x03\x02\x02\x02\u049D\u049B\x03\x02\x02\x02\u049D\u049E\x03\x02\x02\x02" +
		"\u049E\u04A1\x03\x02\x02\x02\u049F\u049D\x03\x02\x02\x02\u04A0\u0496\x03" +
		"\x02\x02\x02\u04A0\u049D\x03\x02\x02\x02\u04A1\xF7\x03\x02\x02\x02\u04A2" +
		"\u04A3\x07`\x02\x02\u04A3\u04A4\x05\u013A\x9E\x02\u04A4\u04A5\x05\xE2" +
		"r\x02\u04A5\u04A6\x05\xFA~\x02\u04A6\xF9\x03\x02\x02\x02\u04A7\u04A8\x05" +
		"\u013A\x9E\x02\u04A8\u04B3\x05j6\x02\u04A9\u04B4\x05\xFC\x7F\x02\u04AA" +
		"\u04AB\x07\x0F\x02\x02\u04AB\u04AC\x05\u013A\x9E\x02\u04AC\u04AD\x05j" +
		"6\x02\u04AD\u04AF\x03\x02\x02\x02\u04AE\u04AA\x03\x02\x02\x02\u04AF\u04B2" +
		"\x03\x02\x02\x02\u04B0\u04AE\x03\x02\x02\x02\u04B0\u04B1\x03\x02\x02\x02" +
		"\u04B1\u04B4\x03\x02\x02\x02\u04B2\u04B0\x03\x02\x02\x02\u04B3\u04A9\x03" +
		"\x02\x02\x02\u04B3\u04B0\x03\x02\x02\x02\u04B4\xFB\x03\x02\x02\x02\u04B5" +
		"\u04B7\x05\xFE\x80\x02\u04B6\u04B8\x05\u0100\x81\x02\u04B7\u04B6\x03\x02" +
		"\x02\x02\u04B7\u04B8\x03\x02\x02\x02\u04B8\u04BB\x03\x02\x02\x02\u04B9" +
		"\u04BB\x05\u0100\x81\x02\u04BA\u04B5\x03\x02\x02\x02\u04BA\u04B9\x03\x02" +
		"\x02\x02\u04BB\xFD\x03\x02\x02\x02\u04BC\u04BD\x07G\x02\x02\u04BD\u04BE" +
		"\x05\u0102\x82\x02\u04BE\xFF\x03\x02\x02\x02\u04BF\u04C0\x07&\x02\x02" +
		"\u04C0\u04C1\x05\u0102\x82\x02\u04C1\u0101\x03\x02\x02\x02\u04C2\u04C3" +
		"\x07\x12\x02\x02\u04C3\u04C8\x05\x18\r\x02\u04C4\u04C5\x07\x0F\x02\x02" +
		"\u04C5\u04C7\x05\x18\r\x02\u04C6\u04C4\x03\x02\x02\x02\u04C7\u04CA\x03" +
		"\x02\x02\x02\u04C8\u04C6\x03\x02\x02\x02\u04C8\u04C9\x03\x02\x02\x02\u04C9" +
		"\u04CB\x03\x02\x02\x02\u04CA\u04C8\x03\x02\x02\x02\u04CB\u04CC\x07\x13" +
		"\x02\x02\u04CC\u0103\x03\x02\x02\x02\u04CD\u04D0\x05\u0108\x85\x02\u04CE" +
		"\u04D0\x05\u0106\x84\x02\u04CF\u04CD\x03\x02\x02\x02\u04CF\u04CE\x03\x02" +
		"\x02\x02\u04D0\u0105\x03\x02\x02\x02\u04D1\u04D2\x07d\x02\x02\u04D2\u04D3" +
		"\x07s\x02\x02\u04D3\u0107\x03\x02\x02\x02\u04D4\u04D5\x05\u010A\x86\x02" +
		"\u04D5\u04D6\x07\x10\x02\x02\u04D6\u04D7\x05\u0110\x89\x02\u04D7\u04D8" +
		"\x07\x11\x02\x02\u04D8\u0109\x03\x02\x02\x02\u04D9\u04DA\x07d\x02\x02" +
		"\u04DA\u04DC\x05\u0142\xA2\x02\u04DB\u04DD\x05\u010E\x88\x02\u04DC\u04DB" +
		"\x03\x02\x02\x02\u04DC\u04DD\x03\x02\x02\x02\u04DD\u04DF\x03\x02\x02\x02" +
		"\u04DE\u04E0\x05\u010C\x87\x02\u04DF\u04DE\x03\x02\x02\x02\u04DF\u04E0" +
		"\x03\x02\x02\x02\u04E0\u010B\x03\x02\x02\x02\u04E1\u04E2\x07K\x02\x02" +
		"\u04E2\u04E7\x05\x18\r\x02\u04E3\u04E4\x07\x0F\x02\x02\u04E4\u04E6\x05" +
		"\x18\r\x02\u04E5\u04E3\x03\x02\x02\x02\u04E6\u04E9\x03\x02\x02\x02\u04E7" +
		"\u04E5\x03\x02\x02\x02\u04E7\u04E8\x03\x02\x02\x02\u04E8\u010D\x03\x02" +
		"\x02\x02\u04E9\u04E7\x03\x02\x02\x02\u04EA\u04EB\x07\x0E\x02\x02\u04EB" +
		"\u04EC\x05\x18\r\x02\u04EC\u010F\x03\x02\x02\x02\u04ED\u04EF\x05\u0112" +
		"\x8A\x02\u04EE\u04ED\x03\x02\x02\x02\u04EF\u04F2\x03\x02\x02\x02\u04F0" +
		"\u04EE\x03\x02\x02\x02\u04F0\u04F1\x03\x02\x02\x02\u04F1\u0111\x03\x02" +
		"\x02\x02\u04F2\u04F0\x03\x02\x02\x02\u04F3\u0506\x05\u013A\x9E\x02\u04F4" +
		"\u04F5\x05\u0114\x8B\x02\u04F5\u04F6\x07\r\x02\x02\u04F6\u0507\x03\x02" +
		"\x02\x02\u04F7\u04F8\x05\u0118\x8D\x02\u04F8\u04F9\x07\r\x02\x02\u04F9" +
		"\u0507\x03\x02\x02\x02\u04FA\u04FB\x05\u011A\x8E\x02\u04FB\u04FC\x07\r" +
		"\x02\x02\u04FC\u0507\x03\x02\x02\x02\u04FD\u04FE\x05\u011C\x8F\x02\u04FE" +
		"\u04FF\x07\r\x02\x02\u04FF\u0507\x03\x02\x02\x02\u0500\u0501\x05\u011E" +
		"\x90\x02\u0501\u0502\x07\r\x02\x02\u0502\u0507\x03\x02\x02\x02\u0503\u0504" +
		"\x05\xCEh\x02\u0504\u0505\x07\r\x02\x02\u0505\u0507\x03\x02\x02\x02\u0506" +
		"\u04F4\x03\x02\x02\x02\u0506\u04F7\x03\x02\x02\x02\u0506\u04FA\x03\x02" +
		"\x02\x02\u0506\u04FD\x03\x02\x02\x02\u0506\u0500\x03\x02\x02\x02\u0506" +
		"\u0503\x03\x02\x02\x02\u0507\u0113\x03\x02\x02\x02\u0508\u0509\x07[\x02" +
		"\x02\u0509\u050A\x05\u0116\x8C\x02\u050A\u050B\x07s\x02\x02\u050B\u0115" +
		"\x03\x02\x02\x02\u050C\u050F\x05\u013A\x9E\x02\u050D\u0510\x05\x1A\x0E" +
		"\x02\u050E\u0510\x07M\x02\x02\u050F\u050D\x03\x02\x02\x02\u050F\u050E" +
		"\x03\x02\x02\x02\u0510\u0117\x03\x02\x02\x02\u0511\u0513\x07-\x02\x02" +
		"\u0512\u0514\x07X\x02\x02\u0513\u0512\x03\x02\x02\x02\u0513\u0514\x03" +
		"\x02\x02\x02\u0514\u0515\x03\x02\x02\x02\u0515\u0516\x05\u0116\x8C\x02" +
		"\u0516\u0517\x07s\x02\x02\u0517\u0119\x03\x02\x02\x02\u0518\u0519\x07" +
		"(\x02\x02\u0519\u051A\x05\x18\r\x02\u051A\u051B\x07s\x02\x02\u051B\u011B" +
		"\x03\x02\x02\x02\u051C\u051D\x07+\x02\x02\u051D\u051E\x05\x18\r\x02\u051E" +
		"\u051F\x07s\x02\x02\u051F\u011D\x03\x02\x02\x02\u0520\u0521\x07\\\x02" +
		"\x02\u0521\u0522\x05\x18\r\x02\u0522\u0523\x07s\x02\x02\u0523\u011F\x03" +
		"\x02\x02\x02\u0524\u0525\x05\u0122\x92\x02\u0525\u0526\x05\u0128\x95\x02" +
		"\u0526\u0121\x03\x02\x02\x02\u0527\u0528\x07D\x02\x02\u0528\u052A\x05" +
		"\u0142\xA2\x02\u0529\u052B\x05\u0124\x93\x02\u052A\u0529\x03\x02\x02\x02" +
		"\u052A\u052B\x03\x02\x02\x02\u052B\u052D\x03\x02\x02\x02\u052C\u052E\x05" +
		"\u010C\x87\x02\u052D\u052C\x03\x02\x02\x02\u052D\u052E\x03\x02\x02\x02" +
		"\u052E\u052F\x03\x02\x02\x02\u052F\u0530\x07b\x02\x02\u0530\u0532\x05" +
		"\x18\r\x02\u0531\u0533\x05\u0126\x94\x02\u0532\u0531\x03\x02\x02\x02\u0532" +
		"\u0533\x03\x02\x02\x02\u0533\u0123\x03\x02\x02\x02\u0534\u0535\x07\x0E" +
		"\x02\x02\u0535\u0536\x05\x18\r\x02\u0536\u0125\x03\x02\x02\x02\u0537\u0538" +
		"\x07.\x02\x02\u0538\u0539\x05\x18\r\x02\u0539\u0127\x03\x02\x02\x02\u053A" +
		"\u053E\x07\x10\x02\x02\u053B\u053D\x05\u012A\x96\x02\u053C\u053B\x03\x02" +
		"\x02\x02\u053D\u0540\x03\x02\x02\x02\u053E\u053C\x03\x02\x02\x02\u053E" +
		"\u053F\x03\x02\x02\x02\u053F\u0541\x03\x02\x02\x02\u0540\u053E\x03\x02" +
		"\x02\x02\u0541\u0542\x07\x11\x02\x02\u0542\u0129\x03\x02\x02\x02\u0543" +
		"\u054C\x05\x12\n\x02\u0544\u0547\x05\u013A\x9E\x02\u0545\u0548\x05\u012C" +
		"\x97\x02\u0546\u0548\x05\u012E\x98\x02\u0547\u0545\x03\x02\x02\x02\u0547" +
		"\u0546\x03\x02\x02\x02\u0548\u0549\x03\x02\x02\x02\u0549\u054A\x07\r\x02" +
		"\x02\u054A\u054C\x03\x02\x02\x02\u054B\u0543\x03\x02\x02\x02\u054B\u0544" +
		"\x03\x02\x02\x02\u054C\u012B\x03\x02\x02\x02\u054D\u054E\x07E\x02\x02" +
		"\u054E\u054F\x05\u0142\xA2\x02\u054F\u0551\x07\x12\x02\x02\u0550\u0552" +
		"\x052\x1A\x02\u0551\u0550\x03\x02\x02\x02\u0551\u0552\x03\x02\x02\x02" +
		"\u0552\u0553\x03\x02\x02\x02\u0553\u0555\x07\x13\x02\x02\u0554\u0556\x05" +
		"\xDEp\x02\u0555\u0554\x03\x02\x02\x02\u0555\u0556\x03\x02\x02\x02\u0556" +
		"\u012D\x03\x02\x02\x02\u0557\u0558\x076\x02\x02\u0558\u0559\x05\u0142" +
		"\xA2\x02\u0559\u055B\x07\x12\x02\x02\u055A\u055C\x052\x1A\x02\u055B\u055A" +
		"\x03\x02\x02\x02\u055B\u055C\x03\x02\x02\x02\u055C\u055D\x03\x02\x02\x02" +
		"\u055D\u055F\x07\x13\x02\x02\u055E\u0560\x05\xDEp\x02\u055F\u055E\x03" +
		"\x02\x02\x02\u055F\u0560\x03\x02\x02\x02\u0560\u012F\x03\x02\x02\x02\u0561" +
		"\u0565\x05\u0136\x9C\x02\u0562\u0565\x05\u0134\x9B\x02\u0563\u0565\x05" +
		"\u0132\x9A\x02\u0564\u0561\x03\x02\x02\x02\u0564\u0562\x03\x02\x02\x02" +
		"\u0564\u0563\x03\x02\x02\x02\u0565\u0131\x03\x02\x02\x02\u0566\u0568\x07" +
		"Y\x02\x02\u0567\u0566\x03\x02\x02\x02\u0567\u0568\x03\x02\x02\x02\u0568" +
		"\u0569\x03\x02\x02\x02\u0569\u056A\x07:\x02\x02\u056A\u056B\x07s\x02\x02" +
		"\u056B\u0133\x03\x02\x02\x02\u056C\u056D\x07Y\x02\x02\u056D\u056E\x07" +
		":\x02\x02\u056E\u056F\x05\u0142\xA2\x02\u056F\u0570\x05(\x15\x02\u0570" +
		"\u0574\x07\x10\x02\x02\u0571\u0573\x05\x12\n\x02\u0572\u0571\x03\x02\x02" +
		"\x02\u0573\u0576\x03\x02\x02\x02\u0574\u0572\x03\x02\x02\x02\u0574\u0575" +
		"\x03\x02\x02\x02\u0575\u0577\x03\x02\x02\x02\u0576\u0574\x03\x02\x02\x02" +
		"\u0577\u0578\x07\x11\x02\x02\u0578\u0135\x03\x02\x02\x02\u0579\u057A\x05" +
		"\u0138\x9D\x02\u057A\u057E\x07\x10\x02\x02\u057B\u057D\x05,\x17\x02\u057C" +
		"\u057B\x03\x02\x02\x02\u057D\u0580\x03\x02\x02\x02\u057E\u057C\x03\x02" +
		"\x02\x02\u057E\u057F\x03\x02\x02\x02\u057F\u0581\x03\x02\x02\x02\u0580" +
		"\u057E\x03\x02\x02\x02\u0581\u0582\x07\x11\x02\x02\u0582\u0137\x03\x02" +
		"\x02\x02\u0583\u0585\x07/\x02\x02\u0584\u0583\x03\x02\x02\x02\u0584\u0585" +
		"\x03\x02\x02\x02\u0585\u0586\x03\x02\x02\x02\u0586\u0587\x07:\x02\x02" +
		"\u0587\u0588\x05\u0142\xA2\x02\u0588\u0589\x05(\x15\x02\u0589\u0139\x03" +
		"\x02\x02\x02\u058A\u058C\x05\u013C\x9F\x02\u058B\u058A\x03\x02\x02\x02" +
		"\u058C\u058F\x03\x02\x02\x02\u058D\u058B\x03\x02\x02\x02\u058D\u058E\x03" +
		"\x02\x02\x02\u058E\u013B\x03\x02\x02\x02\u058F\u058D\x03\x02\x02\x02\u0590" +
		"\u0591\x07%\x02\x02\u0591\u0596\x05\x1A\x0E\x02\u0592\u0593\x07\x12\x02" +
		"\x02\u0593\u0594\x05\u013E\xA0\x02\u0594\u0595\x07\x13\x02\x02\u0595\u0597" +
		"\x03\x02\x02\x02\u0596\u0592\x03\x02\x02\x02\u0596\u0597\x03\x02\x02\x02" +
		"\u0597\u013D\x03\x02\x02\x02\u0598\u05A2\x05<\x1F\x02\u0599\u059E\x05" +
		"\u0140\xA1\x02\u059A\u059B\x07\x0F\x02\x02\u059B\u059D\x05\u0140\xA1\x02" +
		"\u059C\u059A\x03\x02\x02\x02\u059D\u05A0\x03\x02\x02\x02\u059E\u059C\x03" +
		"\x02\x02\x02\u059E\u059F\x03\x02\x02\x02\u059F\u05A2\x03\x02\x02\x02\u05A0" +
		"\u059E\x03\x02\x02\x02\u05A1\u0598\x03\x02\x02\x02\u05A1\u0599\x03\x02" +
		"\x02\x02\u05A2\u013F\x03\x02\x02\x02\u05A3\u05A4\x07s\x02\x02\u05A4\u05A5" +
		"\x07 \x02\x02\u05A5\u05A6\x05<\x1F\x02\u05A6\u0141\x03\x02\x02\x02\u05A7" +
		"\u05A8\x05\u013A\x9E\x02\u05A8\u05A9\x07s\x02\x02\u05A9\u0143\x03\x02" +
		"\x02\x02\x7F\u0147\u014D\u0176\u017E\u0185\u018D\u0193\u0198\u019D\u01B6" +
		"\u01BE\u01C7\u01CE\u01D6\u01D9\u01EA\u01F4\u01FA\u0202\u0209\u020C\u0214" +
		"\u0217\u021E\u0225\u0230\u0234\u023D\u025A\u0263\u026B\u0273\u027B\u0283" +
		"\u028B\u0292\u029C\u02B0\u02B7\u02BC\u02C1\u02CC\u02D4\u02DB\u02E2\u02EA" +
		"\u02F0\u02FA\u02FE\u0304\u030F\u0315\u031C\u0321\u0327\u0337\u0341\u0351" +
		"\u0353\u035A\u0365\u036D\u0373\u037B\u038A\u0391\u039A\u03B4\u03B9\u03BE" +
		"\u03CA\u03D8\u03E5\u03EE\u03F9\u0402\u0409\u040F\u0417\u041F\u0425\u042B" +
		"\u042E\u0435\u043D\u0440\u0454\u0460\u0469\u047A\u0484\u049D\u04A0\u04B0" +
		"\u04B3\u04B7\u04BA\u04C8\u04CF\u04DC\u04DF\u04E7\u04F0\u0506\u050F\u0513" +
		"\u052A\u052D\u0532\u053E\u0547\u054B\u0551\u0555\u055B\u055F\u0564\u0567" +
		"\u0574\u057E\u0584\u058D\u0596\u059E\u05A1";
	public static readonly _serializedATN: string = Utils.join(
		[
			IDLParser._serializedATNSegment0,
			IDLParser._serializedATNSegment1,
			IDLParser._serializedATNSegment2,
		],
		"",
	);
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!IDLParser.__ATN) {
			IDLParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(IDLParser._serializedATN));
		}

		return IDLParser.__ATN;
	}

}

export class SpecificationContext extends ParserRuleContext {
	public EOF(): TerminalNode { return this.getToken(IDLParser.EOF, 0); }
	public import_decl(): Import_declContext[];
	public import_decl(i: number): Import_declContext;
	public import_decl(i?: number): Import_declContext | Import_declContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Import_declContext);
		} else {
			return this.getRuleContext(i, Import_declContext);
		}
	}
	public definition(): DefinitionContext[];
	public definition(i: number): DefinitionContext;
	public definition(i?: number): DefinitionContext | DefinitionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(DefinitionContext);
		} else {
			return this.getRuleContext(i, DefinitionContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_specification; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitSpecification) {
			return visitor.visitSpecification(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DefinitionContext extends ParserRuleContext {
	public annapps(): AnnappsContext {
		return this.getRuleContext(0, AnnappsContext);
	}
	public type_decl(): Type_declContext | undefined {
		return this.tryGetRuleContext(0, Type_declContext);
	}
	public SEMICOLON(): TerminalNode | undefined { return this.tryGetToken(IDLParser.SEMICOLON, 0); }
	public const_decl(): Const_declContext | undefined {
		return this.tryGetRuleContext(0, Const_declContext);
	}
	public except_decl(): Except_declContext | undefined {
		return this.tryGetRuleContext(0, Except_declContext);
	}
	public interface_or_forward_decl(): Interface_or_forward_declContext | undefined {
		return this.tryGetRuleContext(0, Interface_or_forward_declContext);
	}
	public module(): ModuleContext | undefined {
		return this.tryGetRuleContext(0, ModuleContext);
	}
	public value(): ValueContext | undefined {
		return this.tryGetRuleContext(0, ValueContext);
	}
	public type_id_decl(): Type_id_declContext | undefined {
		return this.tryGetRuleContext(0, Type_id_declContext);
	}
	public type_prefix_decl(): Type_prefix_declContext | undefined {
		return this.tryGetRuleContext(0, Type_prefix_declContext);
	}
	public event(): EventContext | undefined {
		return this.tryGetRuleContext(0, EventContext);
	}
	public component(): ComponentContext | undefined {
		return this.tryGetRuleContext(0, ComponentContext);
	}
	public home_decl(): Home_declContext | undefined {
		return this.tryGetRuleContext(0, Home_declContext);
	}
	public annotation_decl(): Annotation_declContext | undefined {
		return this.tryGetRuleContext(0, Annotation_declContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_definition; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitDefinition) {
			return visitor.visitDefinition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ModuleContext extends ParserRuleContext {
	public KW_MODULE(): TerminalNode { return this.getToken(IDLParser.KW_MODULE, 0); }
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public LEFT_BRACE(): TerminalNode { return this.getToken(IDLParser.LEFT_BRACE, 0); }
	public RIGHT_BRACE(): TerminalNode { return this.getToken(IDLParser.RIGHT_BRACE, 0); }
	public definition(): DefinitionContext[];
	public definition(i: number): DefinitionContext;
	public definition(i?: number): DefinitionContext | DefinitionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(DefinitionContext);
		} else {
			return this.getRuleContext(i, DefinitionContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_module; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitModule) {
			return visitor.visitModule(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Interface_or_forward_declContext extends ParserRuleContext {
	public annapps(): AnnappsContext {
		return this.getRuleContext(0, AnnappsContext);
	}
	public interface_decl(): Interface_declContext | undefined {
		return this.tryGetRuleContext(0, Interface_declContext);
	}
	public forward_decl(): Forward_declContext | undefined {
		return this.tryGetRuleContext(0, Forward_declContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_interface_or_forward_decl; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitInterface_or_forward_decl) {
			return visitor.visitInterface_or_forward_decl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Interface_declContext extends ParserRuleContext {
	public interface_header(): Interface_headerContext {
		return this.getRuleContext(0, Interface_headerContext);
	}
	public LEFT_BRACE(): TerminalNode { return this.getToken(IDLParser.LEFT_BRACE, 0); }
	public interface_body(): Interface_bodyContext {
		return this.getRuleContext(0, Interface_bodyContext);
	}
	public RIGHT_BRACE(): TerminalNode { return this.getToken(IDLParser.RIGHT_BRACE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_interface_decl; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitInterface_decl) {
			return visitor.visitInterface_decl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Forward_declContext extends ParserRuleContext {
	public KW_INTERFACE(): TerminalNode { return this.getToken(IDLParser.KW_INTERFACE, 0); }
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public KW_ABSTRACT(): TerminalNode | undefined { return this.tryGetToken(IDLParser.KW_ABSTRACT, 0); }
	public KW_LOCAL(): TerminalNode | undefined { return this.tryGetToken(IDLParser.KW_LOCAL, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_forward_decl; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitForward_decl) {
			return visitor.visitForward_decl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Interface_headerContext extends ParserRuleContext {
	public KW_INTERFACE(): TerminalNode { return this.getToken(IDLParser.KW_INTERFACE, 0); }
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public interface_inheritance_spec(): Interface_inheritance_specContext | undefined {
		return this.tryGetRuleContext(0, Interface_inheritance_specContext);
	}
	public KW_ABSTRACT(): TerminalNode | undefined { return this.tryGetToken(IDLParser.KW_ABSTRACT, 0); }
	public KW_LOCAL(): TerminalNode | undefined { return this.tryGetToken(IDLParser.KW_LOCAL, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_interface_header; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitInterface_header) {
			return visitor.visitInterface_header(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Interface_bodyContext extends ParserRuleContext {
	public export_(): Export_Context[];
	public export_(i: number): Export_Context;
	public export_(i?: number): Export_Context | Export_Context[] {
		if (i === undefined) {
			return this.getRuleContexts(Export_Context);
		} else {
			return this.getRuleContext(i, Export_Context);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_interface_body; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitInterface_body) {
			return visitor.visitInterface_body(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Export_Context extends ParserRuleContext {
	public annapps(): AnnappsContext {
		return this.getRuleContext(0, AnnappsContext);
	}
	public type_decl(): Type_declContext | undefined {
		return this.tryGetRuleContext(0, Type_declContext);
	}
	public SEMICOLON(): TerminalNode | undefined { return this.tryGetToken(IDLParser.SEMICOLON, 0); }
	public const_decl(): Const_declContext | undefined {
		return this.tryGetRuleContext(0, Const_declContext);
	}
	public except_decl(): Except_declContext | undefined {
		return this.tryGetRuleContext(0, Except_declContext);
	}
	public attr_decl(): Attr_declContext | undefined {
		return this.tryGetRuleContext(0, Attr_declContext);
	}
	public op_decl(): Op_declContext | undefined {
		return this.tryGetRuleContext(0, Op_declContext);
	}
	public type_id_decl(): Type_id_declContext | undefined {
		return this.tryGetRuleContext(0, Type_id_declContext);
	}
	public type_prefix_decl(): Type_prefix_declContext | undefined {
		return this.tryGetRuleContext(0, Type_prefix_declContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_export_; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitExport_) {
			return visitor.visitExport_(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Interface_inheritance_specContext extends ParserRuleContext {
	public COLON(): TerminalNode { return this.getToken(IDLParser.COLON, 0); }
	public interface_name(): Interface_nameContext[];
	public interface_name(i: number): Interface_nameContext;
	public interface_name(i?: number): Interface_nameContext | Interface_nameContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Interface_nameContext);
		} else {
			return this.getRuleContext(i, Interface_nameContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(IDLParser.COMMA);
		} else {
			return this.getToken(IDLParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_interface_inheritance_spec; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitInterface_inheritance_spec) {
			return visitor.visitInterface_inheritance_spec(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Interface_nameContext extends ParserRuleContext {
	public a_scoped_name(): A_scoped_nameContext {
		return this.getRuleContext(0, A_scoped_nameContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_interface_name; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitInterface_name) {
			return visitor.visitInterface_name(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class A_scoped_nameContext extends ParserRuleContext {
	public annapps(): AnnappsContext {
		return this.getRuleContext(0, AnnappsContext);
	}
	public scoped_name(): Scoped_nameContext {
		return this.getRuleContext(0, Scoped_nameContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_a_scoped_name; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitA_scoped_name) {
			return visitor.visitA_scoped_name(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Scoped_nameContext extends ParserRuleContext {
	public ID(): TerminalNode[];
	public ID(i: number): TerminalNode;
	public ID(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(IDLParser.ID);
		} else {
			return this.getToken(IDLParser.ID, i);
		}
	}
	public DOUBLE_COLON(): TerminalNode[];
	public DOUBLE_COLON(i: number): TerminalNode;
	public DOUBLE_COLON(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(IDLParser.DOUBLE_COLON);
		} else {
			return this.getToken(IDLParser.DOUBLE_COLON, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_scoped_name; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitScoped_name) {
			return visitor.visitScoped_name(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ValueContext extends ParserRuleContext {
	public annapps(): AnnappsContext {
		return this.getRuleContext(0, AnnappsContext);
	}
	public value_decl(): Value_declContext | undefined {
		return this.tryGetRuleContext(0, Value_declContext);
	}
	public value_abs_decl(): Value_abs_declContext | undefined {
		return this.tryGetRuleContext(0, Value_abs_declContext);
	}
	public value_box_decl(): Value_box_declContext | undefined {
		return this.tryGetRuleContext(0, Value_box_declContext);
	}
	public value_forward_decl(): Value_forward_declContext | undefined {
		return this.tryGetRuleContext(0, Value_forward_declContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_value; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitValue) {
			return visitor.visitValue(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Value_forward_declContext extends ParserRuleContext {
	public KW_VALUETYPE(): TerminalNode { return this.getToken(IDLParser.KW_VALUETYPE, 0); }
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public KW_ABSTRACT(): TerminalNode | undefined { return this.tryGetToken(IDLParser.KW_ABSTRACT, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_value_forward_decl; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitValue_forward_decl) {
			return visitor.visitValue_forward_decl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Value_box_declContext extends ParserRuleContext {
	public KW_VALUETYPE(): TerminalNode { return this.getToken(IDLParser.KW_VALUETYPE, 0); }
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public type_spec(): Type_specContext {
		return this.getRuleContext(0, Type_specContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_value_box_decl; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitValue_box_decl) {
			return visitor.visitValue_box_decl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Value_abs_declContext extends ParserRuleContext {
	public KW_ABSTRACT(): TerminalNode { return this.getToken(IDLParser.KW_ABSTRACT, 0); }
	public KW_VALUETYPE(): TerminalNode { return this.getToken(IDLParser.KW_VALUETYPE, 0); }
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public value_inheritance_spec(): Value_inheritance_specContext {
		return this.getRuleContext(0, Value_inheritance_specContext);
	}
	public LEFT_BRACE(): TerminalNode { return this.getToken(IDLParser.LEFT_BRACE, 0); }
	public RIGHT_BRACE(): TerminalNode { return this.getToken(IDLParser.RIGHT_BRACE, 0); }
	public export_(): Export_Context[];
	public export_(i: number): Export_Context;
	public export_(i?: number): Export_Context | Export_Context[] {
		if (i === undefined) {
			return this.getRuleContexts(Export_Context);
		} else {
			return this.getRuleContext(i, Export_Context);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_value_abs_decl; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitValue_abs_decl) {
			return visitor.visitValue_abs_decl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Value_declContext extends ParserRuleContext {
	public value_header(): Value_headerContext {
		return this.getRuleContext(0, Value_headerContext);
	}
	public LEFT_BRACE(): TerminalNode { return this.getToken(IDLParser.LEFT_BRACE, 0); }
	public RIGHT_BRACE(): TerminalNode { return this.getToken(IDLParser.RIGHT_BRACE, 0); }
	public value_element(): Value_elementContext[];
	public value_element(i: number): Value_elementContext;
	public value_element(i?: number): Value_elementContext | Value_elementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Value_elementContext);
		} else {
			return this.getRuleContext(i, Value_elementContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_value_decl; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitValue_decl) {
			return visitor.visitValue_decl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Value_headerContext extends ParserRuleContext {
	public KW_VALUETYPE(): TerminalNode { return this.getToken(IDLParser.KW_VALUETYPE, 0); }
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public value_inheritance_spec(): Value_inheritance_specContext {
		return this.getRuleContext(0, Value_inheritance_specContext);
	}
	public KW_CUSTOM(): TerminalNode | undefined { return this.tryGetToken(IDLParser.KW_CUSTOM, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_value_header; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitValue_header) {
			return visitor.visitValue_header(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Value_inheritance_specContext extends ParserRuleContext {
	public COLON(): TerminalNode | undefined { return this.tryGetToken(IDLParser.COLON, 0); }
	public value_name(): Value_nameContext[];
	public value_name(i: number): Value_nameContext;
	public value_name(i?: number): Value_nameContext | Value_nameContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Value_nameContext);
		} else {
			return this.getRuleContext(i, Value_nameContext);
		}
	}
	public KW_SUPPORTS(): TerminalNode | undefined { return this.tryGetToken(IDLParser.KW_SUPPORTS, 0); }
	public interface_name(): Interface_nameContext[];
	public interface_name(i: number): Interface_nameContext;
	public interface_name(i?: number): Interface_nameContext | Interface_nameContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Interface_nameContext);
		} else {
			return this.getRuleContext(i, Interface_nameContext);
		}
	}
	public KW_TRUNCATABLE(): TerminalNode | undefined { return this.tryGetToken(IDLParser.KW_TRUNCATABLE, 0); }
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(IDLParser.COMMA);
		} else {
			return this.getToken(IDLParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_value_inheritance_spec; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitValue_inheritance_spec) {
			return visitor.visitValue_inheritance_spec(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Value_nameContext extends ParserRuleContext {
	public a_scoped_name(): A_scoped_nameContext {
		return this.getRuleContext(0, A_scoped_nameContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_value_name; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitValue_name) {
			return visitor.visitValue_name(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Value_elementContext extends ParserRuleContext {
	public export_(): Export_Context | undefined {
		return this.tryGetRuleContext(0, Export_Context);
	}
	public state_member(): State_memberContext | undefined {
		return this.tryGetRuleContext(0, State_memberContext);
	}
	public init_decl(): Init_declContext | undefined {
		return this.tryGetRuleContext(0, Init_declContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_value_element; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitValue_element) {
			return visitor.visitValue_element(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class State_memberContext extends ParserRuleContext {
	public annapps(): AnnappsContext[];
	public annapps(i: number): AnnappsContext;
	public annapps(i?: number): AnnappsContext | AnnappsContext[] {
		if (i === undefined) {
			return this.getRuleContexts(AnnappsContext);
		} else {
			return this.getRuleContext(i, AnnappsContext);
		}
	}
	public type_spec(): Type_specContext {
		return this.getRuleContext(0, Type_specContext);
	}
	public declarators(): DeclaratorsContext {
		return this.getRuleContext(0, DeclaratorsContext);
	}
	public SEMICOLON(): TerminalNode { return this.getToken(IDLParser.SEMICOLON, 0); }
	public KW_PUBLIC(): TerminalNode | undefined { return this.tryGetToken(IDLParser.KW_PUBLIC, 0); }
	public KW_PRIVATE(): TerminalNode | undefined { return this.tryGetToken(IDLParser.KW_PRIVATE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_state_member; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitState_member) {
			return visitor.visitState_member(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Init_declContext extends ParserRuleContext {
	public annapps(): AnnappsContext {
		return this.getRuleContext(0, AnnappsContext);
	}
	public KW_FACTORY(): TerminalNode { return this.getToken(IDLParser.KW_FACTORY, 0); }
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public LEFT_BRACKET(): TerminalNode { return this.getToken(IDLParser.LEFT_BRACKET, 0); }
	public RIGHT_BRACKET(): TerminalNode { return this.getToken(IDLParser.RIGHT_BRACKET, 0); }
	public SEMICOLON(): TerminalNode { return this.getToken(IDLParser.SEMICOLON, 0); }
	public init_param_decls(): Init_param_declsContext | undefined {
		return this.tryGetRuleContext(0, Init_param_declsContext);
	}
	public raises_expr(): Raises_exprContext | undefined {
		return this.tryGetRuleContext(0, Raises_exprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_init_decl; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitInit_decl) {
			return visitor.visitInit_decl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Init_param_declsContext extends ParserRuleContext {
	public init_param_decl(): Init_param_declContext[];
	public init_param_decl(i: number): Init_param_declContext;
	public init_param_decl(i?: number): Init_param_declContext | Init_param_declContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Init_param_declContext);
		} else {
			return this.getRuleContext(i, Init_param_declContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(IDLParser.COMMA);
		} else {
			return this.getToken(IDLParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_init_param_decls; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitInit_param_decls) {
			return visitor.visitInit_param_decls(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Init_param_declContext extends ParserRuleContext {
	public annapps(): AnnappsContext[];
	public annapps(i: number): AnnappsContext;
	public annapps(i?: number): AnnappsContext | AnnappsContext[] {
		if (i === undefined) {
			return this.getRuleContexts(AnnappsContext);
		} else {
			return this.getRuleContext(i, AnnappsContext);
		}
	}
	public init_param_attribute(): Init_param_attributeContext {
		return this.getRuleContext(0, Init_param_attributeContext);
	}
	public param_type_spec(): Param_type_specContext {
		return this.getRuleContext(0, Param_type_specContext);
	}
	public simple_declarator(): Simple_declaratorContext {
		return this.getRuleContext(0, Simple_declaratorContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_init_param_decl; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitInit_param_decl) {
			return visitor.visitInit_param_decl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Init_param_attributeContext extends ParserRuleContext {
	public KW_IN(): TerminalNode { return this.getToken(IDLParser.KW_IN, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_init_param_attribute; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitInit_param_attribute) {
			return visitor.visitInit_param_attribute(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Const_declContext extends ParserRuleContext {
	public KW_CONST(): TerminalNode { return this.getToken(IDLParser.KW_CONST, 0); }
	public const_type(): Const_typeContext {
		return this.getRuleContext(0, Const_typeContext);
	}
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public EQUAL(): TerminalNode { return this.getToken(IDLParser.EQUAL, 0); }
	public const_exp(): Const_expContext {
		return this.getRuleContext(0, Const_expContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_const_decl; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitConst_decl) {
			return visitor.visitConst_decl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Const_typeContext extends ParserRuleContext {
	public annapps(): AnnappsContext {
		return this.getRuleContext(0, AnnappsContext);
	}
	public integer_type(): Integer_typeContext | undefined {
		return this.tryGetRuleContext(0, Integer_typeContext);
	}
	public char_type(): Char_typeContext | undefined {
		return this.tryGetRuleContext(0, Char_typeContext);
	}
	public wide_char_type(): Wide_char_typeContext | undefined {
		return this.tryGetRuleContext(0, Wide_char_typeContext);
	}
	public boolean_type(): Boolean_typeContext | undefined {
		return this.tryGetRuleContext(0, Boolean_typeContext);
	}
	public floating_pt_type(): Floating_pt_typeContext | undefined {
		return this.tryGetRuleContext(0, Floating_pt_typeContext);
	}
	public string_type(): String_typeContext | undefined {
		return this.tryGetRuleContext(0, String_typeContext);
	}
	public wide_string_type(): Wide_string_typeContext | undefined {
		return this.tryGetRuleContext(0, Wide_string_typeContext);
	}
	public fixed_pt_const_type(): Fixed_pt_const_typeContext | undefined {
		return this.tryGetRuleContext(0, Fixed_pt_const_typeContext);
	}
	public scoped_name(): Scoped_nameContext | undefined {
		return this.tryGetRuleContext(0, Scoped_nameContext);
	}
	public octet_type(): Octet_typeContext | undefined {
		return this.tryGetRuleContext(0, Octet_typeContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_const_type; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitConst_type) {
			return visitor.visitConst_type(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Const_expContext extends ParserRuleContext {
	public or_expr(): Or_exprContext {
		return this.getRuleContext(0, Or_exprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_const_exp; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitConst_exp) {
			return visitor.visitConst_exp(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Or_exprContext extends ParserRuleContext {
	public xor_expr(): Xor_exprContext[];
	public xor_expr(i: number): Xor_exprContext;
	public xor_expr(i?: number): Xor_exprContext | Xor_exprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Xor_exprContext);
		} else {
			return this.getRuleContext(i, Xor_exprContext);
		}
	}
	public PIPE(): TerminalNode[];
	public PIPE(i: number): TerminalNode;
	public PIPE(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(IDLParser.PIPE);
		} else {
			return this.getToken(IDLParser.PIPE, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_or_expr; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitOr_expr) {
			return visitor.visitOr_expr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Xor_exprContext extends ParserRuleContext {
	public and_expr(): And_exprContext[];
	public and_expr(i: number): And_exprContext;
	public and_expr(i?: number): And_exprContext | And_exprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(And_exprContext);
		} else {
			return this.getRuleContext(i, And_exprContext);
		}
	}
	public CARET(): TerminalNode[];
	public CARET(i: number): TerminalNode;
	public CARET(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(IDLParser.CARET);
		} else {
			return this.getToken(IDLParser.CARET, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_xor_expr; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitXor_expr) {
			return visitor.visitXor_expr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class And_exprContext extends ParserRuleContext {
	public shift_expr(): Shift_exprContext[];
	public shift_expr(i: number): Shift_exprContext;
	public shift_expr(i?: number): Shift_exprContext | Shift_exprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Shift_exprContext);
		} else {
			return this.getRuleContext(i, Shift_exprContext);
		}
	}
	public AMPERSAND(): TerminalNode[];
	public AMPERSAND(i: number): TerminalNode;
	public AMPERSAND(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(IDLParser.AMPERSAND);
		} else {
			return this.getToken(IDLParser.AMPERSAND, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_and_expr; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitAnd_expr) {
			return visitor.visitAnd_expr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Shift_exprContext extends ParserRuleContext {
	public add_expr(): Add_exprContext[];
	public add_expr(i: number): Add_exprContext;
	public add_expr(i?: number): Add_exprContext | Add_exprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Add_exprContext);
		} else {
			return this.getRuleContext(i, Add_exprContext);
		}
	}
	public RIGHT_SHIFT(): TerminalNode[];
	public RIGHT_SHIFT(i: number): TerminalNode;
	public RIGHT_SHIFT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(IDLParser.RIGHT_SHIFT);
		} else {
			return this.getToken(IDLParser.RIGHT_SHIFT, i);
		}
	}
	public LEFT_SHIFT(): TerminalNode[];
	public LEFT_SHIFT(i: number): TerminalNode;
	public LEFT_SHIFT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(IDLParser.LEFT_SHIFT);
		} else {
			return this.getToken(IDLParser.LEFT_SHIFT, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_shift_expr; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitShift_expr) {
			return visitor.visitShift_expr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Add_exprContext extends ParserRuleContext {
	public mult_expr(): Mult_exprContext[];
	public mult_expr(i: number): Mult_exprContext;
	public mult_expr(i?: number): Mult_exprContext | Mult_exprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Mult_exprContext);
		} else {
			return this.getRuleContext(i, Mult_exprContext);
		}
	}
	public PLUS(): TerminalNode[];
	public PLUS(i: number): TerminalNode;
	public PLUS(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(IDLParser.PLUS);
		} else {
			return this.getToken(IDLParser.PLUS, i);
		}
	}
	public MINUS(): TerminalNode[];
	public MINUS(i: number): TerminalNode;
	public MINUS(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(IDLParser.MINUS);
		} else {
			return this.getToken(IDLParser.MINUS, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_add_expr; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitAdd_expr) {
			return visitor.visitAdd_expr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Mult_exprContext extends ParserRuleContext {
	public unary_expr(): Unary_exprContext[];
	public unary_expr(i: number): Unary_exprContext;
	public unary_expr(i?: number): Unary_exprContext | Unary_exprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Unary_exprContext);
		} else {
			return this.getRuleContext(i, Unary_exprContext);
		}
	}
	public STAR(): TerminalNode[];
	public STAR(i: number): TerminalNode;
	public STAR(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(IDLParser.STAR);
		} else {
			return this.getToken(IDLParser.STAR, i);
		}
	}
	public SLASH(): TerminalNode[];
	public SLASH(i: number): TerminalNode;
	public SLASH(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(IDLParser.SLASH);
		} else {
			return this.getToken(IDLParser.SLASH, i);
		}
	}
	public PERCENT(): TerminalNode[];
	public PERCENT(i: number): TerminalNode;
	public PERCENT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(IDLParser.PERCENT);
		} else {
			return this.getToken(IDLParser.PERCENT, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_mult_expr; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitMult_expr) {
			return visitor.visitMult_expr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Unary_exprContext extends ParserRuleContext {
	public unary_operator(): Unary_operatorContext | undefined {
		return this.tryGetRuleContext(0, Unary_operatorContext);
	}
	public primary_expr(): Primary_exprContext {
		return this.getRuleContext(0, Primary_exprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_unary_expr; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitUnary_expr) {
			return visitor.visitUnary_expr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Unary_operatorContext extends ParserRuleContext {
	public MINUS(): TerminalNode | undefined { return this.tryGetToken(IDLParser.MINUS, 0); }
	public PLUS(): TerminalNode | undefined { return this.tryGetToken(IDLParser.PLUS, 0); }
	public TILDE(): TerminalNode | undefined { return this.tryGetToken(IDLParser.TILDE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_unary_operator; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitUnary_operator) {
			return visitor.visitUnary_operator(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Primary_exprContext extends ParserRuleContext {
	public scoped_name(): Scoped_nameContext | undefined {
		return this.tryGetRuleContext(0, Scoped_nameContext);
	}
	public literal(): LiteralContext | undefined {
		return this.tryGetRuleContext(0, LiteralContext);
	}
	public LEFT_BRACKET(): TerminalNode | undefined { return this.tryGetToken(IDLParser.LEFT_BRACKET, 0); }
	public const_exp(): Const_expContext | undefined {
		return this.tryGetRuleContext(0, Const_expContext);
	}
	public RIGHT_BRACKET(): TerminalNode | undefined { return this.tryGetToken(IDLParser.RIGHT_BRACKET, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_primary_expr; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitPrimary_expr) {
			return visitor.visitPrimary_expr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LiteralContext extends ParserRuleContext {
	public HEX_LITERAL(): TerminalNode | undefined { return this.tryGetToken(IDLParser.HEX_LITERAL, 0); }
	public INTEGER_LITERAL(): TerminalNode | undefined { return this.tryGetToken(IDLParser.INTEGER_LITERAL, 0); }
	public OCTAL_LITERAL(): TerminalNode | undefined { return this.tryGetToken(IDLParser.OCTAL_LITERAL, 0); }
	public STRING_LITERAL(): TerminalNode | undefined { return this.tryGetToken(IDLParser.STRING_LITERAL, 0); }
	public WIDE_STRING_LITERAL(): TerminalNode | undefined { return this.tryGetToken(IDLParser.WIDE_STRING_LITERAL, 0); }
	public CHARACTER_LITERAL(): TerminalNode | undefined { return this.tryGetToken(IDLParser.CHARACTER_LITERAL, 0); }
	public WIDE_CHARACTER_LITERAL(): TerminalNode | undefined { return this.tryGetToken(IDLParser.WIDE_CHARACTER_LITERAL, 0); }
	public FIXED_PT_LITERAL(): TerminalNode | undefined { return this.tryGetToken(IDLParser.FIXED_PT_LITERAL, 0); }
	public FLOATING_PT_LITERAL(): TerminalNode | undefined { return this.tryGetToken(IDLParser.FLOATING_PT_LITERAL, 0); }
	public BOOLEAN_LITERAL(): TerminalNode | undefined { return this.tryGetToken(IDLParser.BOOLEAN_LITERAL, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_literal; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitLiteral) {
			return visitor.visitLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Positive_int_constContext extends ParserRuleContext {
	public const_exp(): Const_expContext {
		return this.getRuleContext(0, Const_expContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_positive_int_const; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitPositive_int_const) {
			return visitor.visitPositive_int_const(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Type_declContext extends ParserRuleContext {
	public KW_TYPEDEF(): TerminalNode | undefined { return this.tryGetToken(IDLParser.KW_TYPEDEF, 0); }
	public annapps(): AnnappsContext | undefined {
		return this.tryGetRuleContext(0, AnnappsContext);
	}
	public type_declarator(): Type_declaratorContext | undefined {
		return this.tryGetRuleContext(0, Type_declaratorContext);
	}
	public struct_type(): Struct_typeContext | undefined {
		return this.tryGetRuleContext(0, Struct_typeContext);
	}
	public union_type(): Union_typeContext | undefined {
		return this.tryGetRuleContext(0, Union_typeContext);
	}
	public enum_type(): Enum_typeContext | undefined {
		return this.tryGetRuleContext(0, Enum_typeContext);
	}
	public bitset_type(): Bitset_typeContext | undefined {
		return this.tryGetRuleContext(0, Bitset_typeContext);
	}
	public bitmask_type(): Bitmask_typeContext | undefined {
		return this.tryGetRuleContext(0, Bitmask_typeContext);
	}
	public KW_NATIVE(): TerminalNode | undefined { return this.tryGetToken(IDLParser.KW_NATIVE, 0); }
	public simple_declarator(): Simple_declaratorContext | undefined {
		return this.tryGetRuleContext(0, Simple_declaratorContext);
	}
	public constr_forward_decl(): Constr_forward_declContext | undefined {
		return this.tryGetRuleContext(0, Constr_forward_declContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_type_decl; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitType_decl) {
			return visitor.visitType_decl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Type_declaratorContext extends ParserRuleContext {
	public type_spec(): Type_specContext {
		return this.getRuleContext(0, Type_specContext);
	}
	public declarators(): DeclaratorsContext {
		return this.getRuleContext(0, DeclaratorsContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_type_declarator; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitType_declarator) {
			return visitor.visitType_declarator(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Type_specContext extends ParserRuleContext {
	public simple_type_spec(): Simple_type_specContext | undefined {
		return this.tryGetRuleContext(0, Simple_type_specContext);
	}
	public constr_type_spec(): Constr_type_specContext | undefined {
		return this.tryGetRuleContext(0, Constr_type_specContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_type_spec; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitType_spec) {
			return visitor.visitType_spec(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Simple_type_specContext extends ParserRuleContext {
	public base_type_spec(): Base_type_specContext | undefined {
		return this.tryGetRuleContext(0, Base_type_specContext);
	}
	public template_type_spec(): Template_type_specContext | undefined {
		return this.tryGetRuleContext(0, Template_type_specContext);
	}
	public scoped_name(): Scoped_nameContext | undefined {
		return this.tryGetRuleContext(0, Scoped_nameContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_simple_type_spec; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitSimple_type_spec) {
			return visitor.visitSimple_type_spec(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Bitfield_type_specContext extends ParserRuleContext {
	public integer_type(): Integer_typeContext | undefined {
		return this.tryGetRuleContext(0, Integer_typeContext);
	}
	public boolean_type(): Boolean_typeContext | undefined {
		return this.tryGetRuleContext(0, Boolean_typeContext);
	}
	public octet_type(): Octet_typeContext | undefined {
		return this.tryGetRuleContext(0, Octet_typeContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_bitfield_type_spec; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitBitfield_type_spec) {
			return visitor.visitBitfield_type_spec(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Base_type_specContext extends ParserRuleContext {
	public floating_pt_type(): Floating_pt_typeContext | undefined {
		return this.tryGetRuleContext(0, Floating_pt_typeContext);
	}
	public integer_type(): Integer_typeContext | undefined {
		return this.tryGetRuleContext(0, Integer_typeContext);
	}
	public char_type(): Char_typeContext | undefined {
		return this.tryGetRuleContext(0, Char_typeContext);
	}
	public wide_char_type(): Wide_char_typeContext | undefined {
		return this.tryGetRuleContext(0, Wide_char_typeContext);
	}
	public boolean_type(): Boolean_typeContext | undefined {
		return this.tryGetRuleContext(0, Boolean_typeContext);
	}
	public octet_type(): Octet_typeContext | undefined {
		return this.tryGetRuleContext(0, Octet_typeContext);
	}
	public any_type(): Any_typeContext | undefined {
		return this.tryGetRuleContext(0, Any_typeContext);
	}
	public object_type(): Object_typeContext | undefined {
		return this.tryGetRuleContext(0, Object_typeContext);
	}
	public value_base_type(): Value_base_typeContext | undefined {
		return this.tryGetRuleContext(0, Value_base_typeContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_base_type_spec; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitBase_type_spec) {
			return visitor.visitBase_type_spec(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Template_type_specContext extends ParserRuleContext {
	public sequence_type(): Sequence_typeContext | undefined {
		return this.tryGetRuleContext(0, Sequence_typeContext);
	}
	public set_type(): Set_typeContext | undefined {
		return this.tryGetRuleContext(0, Set_typeContext);
	}
	public map_type(): Map_typeContext | undefined {
		return this.tryGetRuleContext(0, Map_typeContext);
	}
	public string_type(): String_typeContext | undefined {
		return this.tryGetRuleContext(0, String_typeContext);
	}
	public wide_string_type(): Wide_string_typeContext | undefined {
		return this.tryGetRuleContext(0, Wide_string_typeContext);
	}
	public fixed_pt_type(): Fixed_pt_typeContext | undefined {
		return this.tryGetRuleContext(0, Fixed_pt_typeContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_template_type_spec; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitTemplate_type_spec) {
			return visitor.visitTemplate_type_spec(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Constr_type_specContext extends ParserRuleContext {
	public struct_type(): Struct_typeContext | undefined {
		return this.tryGetRuleContext(0, Struct_typeContext);
	}
	public union_type(): Union_typeContext | undefined {
		return this.tryGetRuleContext(0, Union_typeContext);
	}
	public enum_type(): Enum_typeContext | undefined {
		return this.tryGetRuleContext(0, Enum_typeContext);
	}
	public bitset_type(): Bitset_typeContext | undefined {
		return this.tryGetRuleContext(0, Bitset_typeContext);
	}
	public bitmask_type(): Bitmask_typeContext | undefined {
		return this.tryGetRuleContext(0, Bitmask_typeContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_constr_type_spec; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitConstr_type_spec) {
			return visitor.visitConstr_type_spec(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Simple_declaratorsContext extends ParserRuleContext {
	public identifier(): IdentifierContext[];
	public identifier(i: number): IdentifierContext;
	public identifier(i?: number): IdentifierContext | IdentifierContext[] {
		if (i === undefined) {
			return this.getRuleContexts(IdentifierContext);
		} else {
			return this.getRuleContext(i, IdentifierContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(IDLParser.COMMA);
		} else {
			return this.getToken(IDLParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_simple_declarators; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitSimple_declarators) {
			return visitor.visitSimple_declarators(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DeclaratorsContext extends ParserRuleContext {
	public declarator(): DeclaratorContext[];
	public declarator(i: number): DeclaratorContext;
	public declarator(i?: number): DeclaratorContext | DeclaratorContext[] {
		if (i === undefined) {
			return this.getRuleContexts(DeclaratorContext);
		} else {
			return this.getRuleContext(i, DeclaratorContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(IDLParser.COMMA);
		} else {
			return this.getToken(IDLParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_declarators; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitDeclarators) {
			return visitor.visitDeclarators(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DeclaratorContext extends ParserRuleContext {
	public annapps(): AnnappsContext {
		return this.getRuleContext(0, AnnappsContext);
	}
	public simple_declarator(): Simple_declaratorContext | undefined {
		return this.tryGetRuleContext(0, Simple_declaratorContext);
	}
	public complex_declarator(): Complex_declaratorContext | undefined {
		return this.tryGetRuleContext(0, Complex_declaratorContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_declarator; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitDeclarator) {
			return visitor.visitDeclarator(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Simple_declaratorContext extends ParserRuleContext {
	public ID(): TerminalNode { return this.getToken(IDLParser.ID, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_simple_declarator; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitSimple_declarator) {
			return visitor.visitSimple_declarator(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Complex_declaratorContext extends ParserRuleContext {
	public array_declarator(): Array_declaratorContext {
		return this.getRuleContext(0, Array_declaratorContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_complex_declarator; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitComplex_declarator) {
			return visitor.visitComplex_declarator(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Floating_pt_typeContext extends ParserRuleContext {
	public KW_FLOAT(): TerminalNode | undefined { return this.tryGetToken(IDLParser.KW_FLOAT, 0); }
	public KW_DOUBLE(): TerminalNode | undefined { return this.tryGetToken(IDLParser.KW_DOUBLE, 0); }
	public KW_LONG(): TerminalNode | undefined { return this.tryGetToken(IDLParser.KW_LONG, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_floating_pt_type; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitFloating_pt_type) {
			return visitor.visitFloating_pt_type(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Integer_typeContext extends ParserRuleContext {
	public signed_int(): Signed_intContext | undefined {
		return this.tryGetRuleContext(0, Signed_intContext);
	}
	public unsigned_int(): Unsigned_intContext | undefined {
		return this.tryGetRuleContext(0, Unsigned_intContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_integer_type; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitInteger_type) {
			return visitor.visitInteger_type(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Signed_intContext extends ParserRuleContext {
	public signed_short_int(): Signed_short_intContext | undefined {
		return this.tryGetRuleContext(0, Signed_short_intContext);
	}
	public signed_long_int(): Signed_long_intContext | undefined {
		return this.tryGetRuleContext(0, Signed_long_intContext);
	}
	public signed_longlong_int(): Signed_longlong_intContext | undefined {
		return this.tryGetRuleContext(0, Signed_longlong_intContext);
	}
	public signed_tiny_int(): Signed_tiny_intContext | undefined {
		return this.tryGetRuleContext(0, Signed_tiny_intContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_signed_int; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitSigned_int) {
			return visitor.visitSigned_int(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Signed_tiny_intContext extends ParserRuleContext {
	public KW_INT8(): TerminalNode { return this.getToken(IDLParser.KW_INT8, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_signed_tiny_int; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitSigned_tiny_int) {
			return visitor.visitSigned_tiny_int(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Signed_short_intContext extends ParserRuleContext {
	public KW_SHORT(): TerminalNode | undefined { return this.tryGetToken(IDLParser.KW_SHORT, 0); }
	public KW_INT16(): TerminalNode | undefined { return this.tryGetToken(IDLParser.KW_INT16, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_signed_short_int; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitSigned_short_int) {
			return visitor.visitSigned_short_int(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Signed_long_intContext extends ParserRuleContext {
	public KW_LONG(): TerminalNode | undefined { return this.tryGetToken(IDLParser.KW_LONG, 0); }
	public KW_INT32(): TerminalNode | undefined { return this.tryGetToken(IDLParser.KW_INT32, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_signed_long_int; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitSigned_long_int) {
			return visitor.visitSigned_long_int(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Signed_longlong_intContext extends ParserRuleContext {
	public KW_LONG(): TerminalNode[];
	public KW_LONG(i: number): TerminalNode;
	public KW_LONG(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(IDLParser.KW_LONG);
		} else {
			return this.getToken(IDLParser.KW_LONG, i);
		}
	}
	public KW_INT64(): TerminalNode | undefined { return this.tryGetToken(IDLParser.KW_INT64, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_signed_longlong_int; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitSigned_longlong_int) {
			return visitor.visitSigned_longlong_int(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Unsigned_intContext extends ParserRuleContext {
	public unsigned_short_int(): Unsigned_short_intContext | undefined {
		return this.tryGetRuleContext(0, Unsigned_short_intContext);
	}
	public unsigned_long_int(): Unsigned_long_intContext | undefined {
		return this.tryGetRuleContext(0, Unsigned_long_intContext);
	}
	public unsigned_longlong_int(): Unsigned_longlong_intContext | undefined {
		return this.tryGetRuleContext(0, Unsigned_longlong_intContext);
	}
	public unsigned_tiny_int(): Unsigned_tiny_intContext | undefined {
		return this.tryGetRuleContext(0, Unsigned_tiny_intContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_unsigned_int; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitUnsigned_int) {
			return visitor.visitUnsigned_int(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Unsigned_tiny_intContext extends ParserRuleContext {
	public KW_UINT8(): TerminalNode { return this.getToken(IDLParser.KW_UINT8, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_unsigned_tiny_int; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitUnsigned_tiny_int) {
			return visitor.visitUnsigned_tiny_int(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Unsigned_short_intContext extends ParserRuleContext {
	public KW_UNSIGNED(): TerminalNode | undefined { return this.tryGetToken(IDLParser.KW_UNSIGNED, 0); }
	public KW_SHORT(): TerminalNode | undefined { return this.tryGetToken(IDLParser.KW_SHORT, 0); }
	public KW_UINT16(): TerminalNode | undefined { return this.tryGetToken(IDLParser.KW_UINT16, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_unsigned_short_int; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitUnsigned_short_int) {
			return visitor.visitUnsigned_short_int(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Unsigned_long_intContext extends ParserRuleContext {
	public KW_UNSIGNED(): TerminalNode | undefined { return this.tryGetToken(IDLParser.KW_UNSIGNED, 0); }
	public KW_LONG(): TerminalNode | undefined { return this.tryGetToken(IDLParser.KW_LONG, 0); }
	public KW_UINT32(): TerminalNode | undefined { return this.tryGetToken(IDLParser.KW_UINT32, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_unsigned_long_int; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitUnsigned_long_int) {
			return visitor.visitUnsigned_long_int(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Unsigned_longlong_intContext extends ParserRuleContext {
	public KW_UNSIGNED(): TerminalNode | undefined { return this.tryGetToken(IDLParser.KW_UNSIGNED, 0); }
	public KW_LONG(): TerminalNode[];
	public KW_LONG(i: number): TerminalNode;
	public KW_LONG(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(IDLParser.KW_LONG);
		} else {
			return this.getToken(IDLParser.KW_LONG, i);
		}
	}
	public KW_UINT64(): TerminalNode | undefined { return this.tryGetToken(IDLParser.KW_UINT64, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_unsigned_longlong_int; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitUnsigned_longlong_int) {
			return visitor.visitUnsigned_longlong_int(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Char_typeContext extends ParserRuleContext {
	public KW_CHAR(): TerminalNode { return this.getToken(IDLParser.KW_CHAR, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_char_type; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitChar_type) {
			return visitor.visitChar_type(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Wide_char_typeContext extends ParserRuleContext {
	public KW_WCHAR(): TerminalNode { return this.getToken(IDLParser.KW_WCHAR, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_wide_char_type; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitWide_char_type) {
			return visitor.visitWide_char_type(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Boolean_typeContext extends ParserRuleContext {
	public KW_BOOLEAN(): TerminalNode { return this.getToken(IDLParser.KW_BOOLEAN, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_boolean_type; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitBoolean_type) {
			return visitor.visitBoolean_type(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Octet_typeContext extends ParserRuleContext {
	public KW_OCTET(): TerminalNode { return this.getToken(IDLParser.KW_OCTET, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_octet_type; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitOctet_type) {
			return visitor.visitOctet_type(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Any_typeContext extends ParserRuleContext {
	public KW_ANY(): TerminalNode { return this.getToken(IDLParser.KW_ANY, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_any_type; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitAny_type) {
			return visitor.visitAny_type(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Object_typeContext extends ParserRuleContext {
	public KW_OBJECT(): TerminalNode { return this.getToken(IDLParser.KW_OBJECT, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_object_type; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitObject_type) {
			return visitor.visitObject_type(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Annotation_declContext extends ParserRuleContext {
	public annotation_def(): Annotation_defContext | undefined {
		return this.tryGetRuleContext(0, Annotation_defContext);
	}
	public annotation_forward_dcl(): Annotation_forward_dclContext | undefined {
		return this.tryGetRuleContext(0, Annotation_forward_dclContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_annotation_decl; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitAnnotation_decl) {
			return visitor.visitAnnotation_decl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Annotation_defContext extends ParserRuleContext {
	public annotation_header(): Annotation_headerContext {
		return this.getRuleContext(0, Annotation_headerContext);
	}
	public LEFT_BRACE(): TerminalNode { return this.getToken(IDLParser.LEFT_BRACE, 0); }
	public annotation_body(): Annotation_bodyContext {
		return this.getRuleContext(0, Annotation_bodyContext);
	}
	public RIGHT_BRACE(): TerminalNode { return this.getToken(IDLParser.RIGHT_BRACE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_annotation_def; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitAnnotation_def) {
			return visitor.visitAnnotation_def(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Annotation_headerContext extends ParserRuleContext {
	public KW_AT_ANNOTATION(): TerminalNode { return this.getToken(IDLParser.KW_AT_ANNOTATION, 0); }
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public annotation_inheritance_spec(): Annotation_inheritance_specContext | undefined {
		return this.tryGetRuleContext(0, Annotation_inheritance_specContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_annotation_header; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitAnnotation_header) {
			return visitor.visitAnnotation_header(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Annotation_inheritance_specContext extends ParserRuleContext {
	public COLON(): TerminalNode { return this.getToken(IDLParser.COLON, 0); }
	public scoped_name(): Scoped_nameContext {
		return this.getRuleContext(0, Scoped_nameContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_annotation_inheritance_spec; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitAnnotation_inheritance_spec) {
			return visitor.visitAnnotation_inheritance_spec(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Annotation_bodyContext extends ParserRuleContext {
	public annotation_member(): Annotation_memberContext[];
	public annotation_member(i: number): Annotation_memberContext;
	public annotation_member(i?: number): Annotation_memberContext | Annotation_memberContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Annotation_memberContext);
		} else {
			return this.getRuleContext(i, Annotation_memberContext);
		}
	}
	public enum_type(): Enum_typeContext[];
	public enum_type(i: number): Enum_typeContext;
	public enum_type(i?: number): Enum_typeContext | Enum_typeContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Enum_typeContext);
		} else {
			return this.getRuleContext(i, Enum_typeContext);
		}
	}
	public SEMICOLON(): TerminalNode[];
	public SEMICOLON(i: number): TerminalNode;
	public SEMICOLON(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(IDLParser.SEMICOLON);
		} else {
			return this.getToken(IDLParser.SEMICOLON, i);
		}
	}
	public const_decl(): Const_declContext[];
	public const_decl(i: number): Const_declContext;
	public const_decl(i?: number): Const_declContext | Const_declContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Const_declContext);
		} else {
			return this.getRuleContext(i, Const_declContext);
		}
	}
	public KW_TYPEDEF(): TerminalNode[];
	public KW_TYPEDEF(i: number): TerminalNode;
	public KW_TYPEDEF(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(IDLParser.KW_TYPEDEF);
		} else {
			return this.getToken(IDLParser.KW_TYPEDEF, i);
		}
	}
	public type_declarator(): Type_declaratorContext[];
	public type_declarator(i: number): Type_declaratorContext;
	public type_declarator(i?: number): Type_declaratorContext | Type_declaratorContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Type_declaratorContext);
		} else {
			return this.getRuleContext(i, Type_declaratorContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_annotation_body; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitAnnotation_body) {
			return visitor.visitAnnotation_body(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Annotation_memberContext extends ParserRuleContext {
	public const_type(): Const_typeContext {
		return this.getRuleContext(0, Const_typeContext);
	}
	public simple_declarator(): Simple_declaratorContext {
		return this.getRuleContext(0, Simple_declaratorContext);
	}
	public SEMICOLON(): TerminalNode { return this.getToken(IDLParser.SEMICOLON, 0); }
	public KW_DEFAULT(): TerminalNode | undefined { return this.tryGetToken(IDLParser.KW_DEFAULT, 0); }
	public const_exp(): Const_expContext | undefined {
		return this.tryGetRuleContext(0, Const_expContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_annotation_member; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitAnnotation_member) {
			return visitor.visitAnnotation_member(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Annotation_forward_dclContext extends ParserRuleContext {
	public KW_AT_ANNOTATION(): TerminalNode { return this.getToken(IDLParser.KW_AT_ANNOTATION, 0); }
	public scoped_name(): Scoped_nameContext {
		return this.getRuleContext(0, Scoped_nameContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_annotation_forward_dcl; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitAnnotation_forward_dcl) {
			return visitor.visitAnnotation_forward_dcl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Bitset_typeContext extends ParserRuleContext {
	public KW_BITSET(): TerminalNode { return this.getToken(IDLParser.KW_BITSET, 0); }
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public LEFT_BRACE(): TerminalNode { return this.getToken(IDLParser.LEFT_BRACE, 0); }
	public bitfield(): BitfieldContext {
		return this.getRuleContext(0, BitfieldContext);
	}
	public RIGHT_BRACE(): TerminalNode { return this.getToken(IDLParser.RIGHT_BRACE, 0); }
	public COLON(): TerminalNode | undefined { return this.tryGetToken(IDLParser.COLON, 0); }
	public scoped_name(): Scoped_nameContext | undefined {
		return this.tryGetRuleContext(0, Scoped_nameContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_bitset_type; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitBitset_type) {
			return visitor.visitBitset_type(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BitfieldContext extends ParserRuleContext {
	public bitfield_spec(): Bitfield_specContext[];
	public bitfield_spec(i: number): Bitfield_specContext;
	public bitfield_spec(i?: number): Bitfield_specContext | Bitfield_specContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Bitfield_specContext);
		} else {
			return this.getRuleContext(i, Bitfield_specContext);
		}
	}
	public SEMICOLON(): TerminalNode[];
	public SEMICOLON(i: number): TerminalNode;
	public SEMICOLON(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(IDLParser.SEMICOLON);
		} else {
			return this.getToken(IDLParser.SEMICOLON, i);
		}
	}
	public simple_declarators(): Simple_declaratorsContext[];
	public simple_declarators(i: number): Simple_declaratorsContext;
	public simple_declarators(i?: number): Simple_declaratorsContext | Simple_declaratorsContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Simple_declaratorsContext);
		} else {
			return this.getRuleContext(i, Simple_declaratorsContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_bitfield; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitBitfield) {
			return visitor.visitBitfield(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Bitfield_specContext extends ParserRuleContext {
	public annapps(): AnnappsContext {
		return this.getRuleContext(0, AnnappsContext);
	}
	public KW_BITFIELD(): TerminalNode { return this.getToken(IDLParser.KW_BITFIELD, 0); }
	public LEFT_ANG_BRACKET(): TerminalNode { return this.getToken(IDLParser.LEFT_ANG_BRACKET, 0); }
	public positive_int_const(): Positive_int_constContext {
		return this.getRuleContext(0, Positive_int_constContext);
	}
	public RIGHT_ANG_BRACKET(): TerminalNode { return this.getToken(IDLParser.RIGHT_ANG_BRACKET, 0); }
	public COMMA(): TerminalNode | undefined { return this.tryGetToken(IDLParser.COMMA, 0); }
	public bitfield_type_spec(): Bitfield_type_specContext | undefined {
		return this.tryGetRuleContext(0, Bitfield_type_specContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_bitfield_spec; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitBitfield_spec) {
			return visitor.visitBitfield_spec(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Bitmask_typeContext extends ParserRuleContext {
	public KW_BITMASK(): TerminalNode { return this.getToken(IDLParser.KW_BITMASK, 0); }
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public LEFT_BRACE(): TerminalNode { return this.getToken(IDLParser.LEFT_BRACE, 0); }
	public bit_values(): Bit_valuesContext {
		return this.getRuleContext(0, Bit_valuesContext);
	}
	public RIGHT_BRACE(): TerminalNode { return this.getToken(IDLParser.RIGHT_BRACE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_bitmask_type; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitBitmask_type) {
			return visitor.visitBitmask_type(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Bit_valuesContext extends ParserRuleContext {
	public identifier(): IdentifierContext[];
	public identifier(i: number): IdentifierContext;
	public identifier(i?: number): IdentifierContext | IdentifierContext[] {
		if (i === undefined) {
			return this.getRuleContexts(IdentifierContext);
		} else {
			return this.getRuleContext(i, IdentifierContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(IDLParser.COMMA);
		} else {
			return this.getToken(IDLParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_bit_values; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitBit_values) {
			return visitor.visitBit_values(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Struct_typeContext extends ParserRuleContext {
	public KW_STRUCT(): TerminalNode { return this.getToken(IDLParser.KW_STRUCT, 0); }
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public LEFT_BRACE(): TerminalNode { return this.getToken(IDLParser.LEFT_BRACE, 0); }
	public member_list(): Member_listContext {
		return this.getRuleContext(0, Member_listContext);
	}
	public RIGHT_BRACE(): TerminalNode { return this.getToken(IDLParser.RIGHT_BRACE, 0); }
	public COLON(): TerminalNode | undefined { return this.tryGetToken(IDLParser.COLON, 0); }
	public scoped_name(): Scoped_nameContext | undefined {
		return this.tryGetRuleContext(0, Scoped_nameContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_struct_type; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitStruct_type) {
			return visitor.visitStruct_type(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Member_listContext extends ParserRuleContext {
	public member(): MemberContext[];
	public member(i: number): MemberContext;
	public member(i?: number): MemberContext | MemberContext[] {
		if (i === undefined) {
			return this.getRuleContexts(MemberContext);
		} else {
			return this.getRuleContext(i, MemberContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_member_list; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitMember_list) {
			return visitor.visitMember_list(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MemberContext extends ParserRuleContext {
	public annapps(): AnnappsContext {
		return this.getRuleContext(0, AnnappsContext);
	}
	public type_spec(): Type_specContext {
		return this.getRuleContext(0, Type_specContext);
	}
	public declarators(): DeclaratorsContext {
		return this.getRuleContext(0, DeclaratorsContext);
	}
	public SEMICOLON(): TerminalNode { return this.getToken(IDLParser.SEMICOLON, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_member; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitMember) {
			return visitor.visitMember(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Union_typeContext extends ParserRuleContext {
	public KW_UNION(): TerminalNode { return this.getToken(IDLParser.KW_UNION, 0); }
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public KW_SWITCH(): TerminalNode { return this.getToken(IDLParser.KW_SWITCH, 0); }
	public LEFT_BRACKET(): TerminalNode { return this.getToken(IDLParser.LEFT_BRACKET, 0); }
	public annapps(): AnnappsContext {
		return this.getRuleContext(0, AnnappsContext);
	}
	public switch_type_spec(): Switch_type_specContext {
		return this.getRuleContext(0, Switch_type_specContext);
	}
	public RIGHT_BRACKET(): TerminalNode { return this.getToken(IDLParser.RIGHT_BRACKET, 0); }
	public LEFT_BRACE(): TerminalNode { return this.getToken(IDLParser.LEFT_BRACE, 0); }
	public switch_body(): Switch_bodyContext {
		return this.getRuleContext(0, Switch_bodyContext);
	}
	public RIGHT_BRACE(): TerminalNode { return this.getToken(IDLParser.RIGHT_BRACE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_union_type; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitUnion_type) {
			return visitor.visitUnion_type(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Switch_type_specContext extends ParserRuleContext {
	public integer_type(): Integer_typeContext | undefined {
		return this.tryGetRuleContext(0, Integer_typeContext);
	}
	public char_type(): Char_typeContext | undefined {
		return this.tryGetRuleContext(0, Char_typeContext);
	}
	public wide_char_type(): Wide_char_typeContext | undefined {
		return this.tryGetRuleContext(0, Wide_char_typeContext);
	}
	public octet_type(): Octet_typeContext | undefined {
		return this.tryGetRuleContext(0, Octet_typeContext);
	}
	public boolean_type(): Boolean_typeContext | undefined {
		return this.tryGetRuleContext(0, Boolean_typeContext);
	}
	public enum_type(): Enum_typeContext | undefined {
		return this.tryGetRuleContext(0, Enum_typeContext);
	}
	public scoped_name(): Scoped_nameContext | undefined {
		return this.tryGetRuleContext(0, Scoped_nameContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_switch_type_spec; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitSwitch_type_spec) {
			return visitor.visitSwitch_type_spec(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Switch_bodyContext extends ParserRuleContext {
	public case_stmt(): Case_stmtContext[];
	public case_stmt(i: number): Case_stmtContext;
	public case_stmt(i?: number): Case_stmtContext | Case_stmtContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Case_stmtContext);
		} else {
			return this.getRuleContext(i, Case_stmtContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_switch_body; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitSwitch_body) {
			return visitor.visitSwitch_body(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Case_stmtContext extends ParserRuleContext {
	public element_spec(): Element_specContext {
		return this.getRuleContext(0, Element_specContext);
	}
	public SEMICOLON(): TerminalNode { return this.getToken(IDLParser.SEMICOLON, 0); }
	public case_label(): Case_labelContext[];
	public case_label(i: number): Case_labelContext;
	public case_label(i?: number): Case_labelContext | Case_labelContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Case_labelContext);
		} else {
			return this.getRuleContext(i, Case_labelContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_case_stmt; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitCase_stmt) {
			return visitor.visitCase_stmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Case_labelContext extends ParserRuleContext {
	public annapps(): AnnappsContext {
		return this.getRuleContext(0, AnnappsContext);
	}
	public KW_CASE(): TerminalNode | undefined { return this.tryGetToken(IDLParser.KW_CASE, 0); }
	public const_exp(): Const_expContext | undefined {
		return this.tryGetRuleContext(0, Const_expContext);
	}
	public COLON(): TerminalNode | undefined { return this.tryGetToken(IDLParser.COLON, 0); }
	public KW_DEFAULT(): TerminalNode | undefined { return this.tryGetToken(IDLParser.KW_DEFAULT, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_case_label; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitCase_label) {
			return visitor.visitCase_label(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Element_specContext extends ParserRuleContext {
	public annapps(): AnnappsContext {
		return this.getRuleContext(0, AnnappsContext);
	}
	public type_spec(): Type_specContext {
		return this.getRuleContext(0, Type_specContext);
	}
	public declarator(): DeclaratorContext {
		return this.getRuleContext(0, DeclaratorContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_element_spec; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitElement_spec) {
			return visitor.visitElement_spec(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Enum_typeContext extends ParserRuleContext {
	public KW_ENUM(): TerminalNode { return this.getToken(IDLParser.KW_ENUM, 0); }
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public LEFT_BRACE(): TerminalNode { return this.getToken(IDLParser.LEFT_BRACE, 0); }
	public enumerator(): EnumeratorContext[];
	public enumerator(i: number): EnumeratorContext;
	public enumerator(i?: number): EnumeratorContext | EnumeratorContext[] {
		if (i === undefined) {
			return this.getRuleContexts(EnumeratorContext);
		} else {
			return this.getRuleContext(i, EnumeratorContext);
		}
	}
	public RIGHT_BRACE(): TerminalNode { return this.getToken(IDLParser.RIGHT_BRACE, 0); }
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(IDLParser.COMMA);
		} else {
			return this.getToken(IDLParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_enum_type; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitEnum_type) {
			return visitor.visitEnum_type(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class EnumeratorContext extends ParserRuleContext {
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_enumerator; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitEnumerator) {
			return visitor.visitEnumerator(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Sequence_typeContext extends ParserRuleContext {
	public KW_SEQUENCE(): TerminalNode { return this.getToken(IDLParser.KW_SEQUENCE, 0); }
	public LEFT_ANG_BRACKET(): TerminalNode { return this.getToken(IDLParser.LEFT_ANG_BRACKET, 0); }
	public annapps(): AnnappsContext {
		return this.getRuleContext(0, AnnappsContext);
	}
	public simple_type_spec(): Simple_type_specContext {
		return this.getRuleContext(0, Simple_type_specContext);
	}
	public RIGHT_ANG_BRACKET(): TerminalNode { return this.getToken(IDLParser.RIGHT_ANG_BRACKET, 0); }
	public COMMA(): TerminalNode | undefined { return this.tryGetToken(IDLParser.COMMA, 0); }
	public positive_int_const(): Positive_int_constContext | undefined {
		return this.tryGetRuleContext(0, Positive_int_constContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_sequence_type; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitSequence_type) {
			return visitor.visitSequence_type(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Set_typeContext extends ParserRuleContext {
	public KW_SET(): TerminalNode { return this.getToken(IDLParser.KW_SET, 0); }
	public LEFT_ANG_BRACKET(): TerminalNode { return this.getToken(IDLParser.LEFT_ANG_BRACKET, 0); }
	public simple_type_spec(): Simple_type_specContext {
		return this.getRuleContext(0, Simple_type_specContext);
	}
	public RIGHT_ANG_BRACKET(): TerminalNode { return this.getToken(IDLParser.RIGHT_ANG_BRACKET, 0); }
	public COMMA(): TerminalNode | undefined { return this.tryGetToken(IDLParser.COMMA, 0); }
	public positive_int_const(): Positive_int_constContext | undefined {
		return this.tryGetRuleContext(0, Positive_int_constContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_set_type; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitSet_type) {
			return visitor.visitSet_type(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Map_typeContext extends ParserRuleContext {
	public KW_MAP(): TerminalNode { return this.getToken(IDLParser.KW_MAP, 0); }
	public LEFT_ANG_BRACKET(): TerminalNode { return this.getToken(IDLParser.LEFT_ANG_BRACKET, 0); }
	public simple_type_spec(): Simple_type_specContext[];
	public simple_type_spec(i: number): Simple_type_specContext;
	public simple_type_spec(i?: number): Simple_type_specContext | Simple_type_specContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Simple_type_specContext);
		} else {
			return this.getRuleContext(i, Simple_type_specContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(IDLParser.COMMA);
		} else {
			return this.getToken(IDLParser.COMMA, i);
		}
	}
	public RIGHT_ANG_BRACKET(): TerminalNode { return this.getToken(IDLParser.RIGHT_ANG_BRACKET, 0); }
	public positive_int_const(): Positive_int_constContext | undefined {
		return this.tryGetRuleContext(0, Positive_int_constContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_map_type; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitMap_type) {
			return visitor.visitMap_type(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class String_typeContext extends ParserRuleContext {
	public KW_STRING(): TerminalNode { return this.getToken(IDLParser.KW_STRING, 0); }
	public LEFT_ANG_BRACKET(): TerminalNode | undefined { return this.tryGetToken(IDLParser.LEFT_ANG_BRACKET, 0); }
	public positive_int_const(): Positive_int_constContext | undefined {
		return this.tryGetRuleContext(0, Positive_int_constContext);
	}
	public RIGHT_ANG_BRACKET(): TerminalNode | undefined { return this.tryGetToken(IDLParser.RIGHT_ANG_BRACKET, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_string_type; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitString_type) {
			return visitor.visitString_type(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Wide_string_typeContext extends ParserRuleContext {
	public KW_WSTRING(): TerminalNode { return this.getToken(IDLParser.KW_WSTRING, 0); }
	public LEFT_ANG_BRACKET(): TerminalNode | undefined { return this.tryGetToken(IDLParser.LEFT_ANG_BRACKET, 0); }
	public positive_int_const(): Positive_int_constContext | undefined {
		return this.tryGetRuleContext(0, Positive_int_constContext);
	}
	public RIGHT_ANG_BRACKET(): TerminalNode | undefined { return this.tryGetToken(IDLParser.RIGHT_ANG_BRACKET, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_wide_string_type; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitWide_string_type) {
			return visitor.visitWide_string_type(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Array_declaratorContext extends ParserRuleContext {
	public ID(): TerminalNode { return this.getToken(IDLParser.ID, 0); }
	public fixed_array_size(): Fixed_array_sizeContext[];
	public fixed_array_size(i: number): Fixed_array_sizeContext;
	public fixed_array_size(i?: number): Fixed_array_sizeContext | Fixed_array_sizeContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Fixed_array_sizeContext);
		} else {
			return this.getRuleContext(i, Fixed_array_sizeContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_array_declarator; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitArray_declarator) {
			return visitor.visitArray_declarator(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Fixed_array_sizeContext extends ParserRuleContext {
	public LEFT_SQUARE_BRACKET(): TerminalNode { return this.getToken(IDLParser.LEFT_SQUARE_BRACKET, 0); }
	public positive_int_const(): Positive_int_constContext {
		return this.getRuleContext(0, Positive_int_constContext);
	}
	public RIGHT_SQUARE_BRACKET(): TerminalNode { return this.getToken(IDLParser.RIGHT_SQUARE_BRACKET, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_fixed_array_size; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitFixed_array_size) {
			return visitor.visitFixed_array_size(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Attr_declContext extends ParserRuleContext {
	public readonly_attr_spec(): Readonly_attr_specContext | undefined {
		return this.tryGetRuleContext(0, Readonly_attr_specContext);
	}
	public attr_spec(): Attr_specContext | undefined {
		return this.tryGetRuleContext(0, Attr_specContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_attr_decl; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitAttr_decl) {
			return visitor.visitAttr_decl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Except_declContext extends ParserRuleContext {
	public KW_EXCEPTION(): TerminalNode { return this.getToken(IDLParser.KW_EXCEPTION, 0); }
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public LEFT_BRACE(): TerminalNode { return this.getToken(IDLParser.LEFT_BRACE, 0); }
	public RIGHT_BRACE(): TerminalNode { return this.getToken(IDLParser.RIGHT_BRACE, 0); }
	public member(): MemberContext[];
	public member(i: number): MemberContext;
	public member(i?: number): MemberContext | MemberContext[] {
		if (i === undefined) {
			return this.getRuleContexts(MemberContext);
		} else {
			return this.getRuleContext(i, MemberContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_except_decl; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitExcept_decl) {
			return visitor.visitExcept_decl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Op_declContext extends ParserRuleContext {
	public op_type_spec(): Op_type_specContext {
		return this.getRuleContext(0, Op_type_specContext);
	}
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public parameter_decls(): Parameter_declsContext {
		return this.getRuleContext(0, Parameter_declsContext);
	}
	public op_attribute(): Op_attributeContext | undefined {
		return this.tryGetRuleContext(0, Op_attributeContext);
	}
	public raises_expr(): Raises_exprContext | undefined {
		return this.tryGetRuleContext(0, Raises_exprContext);
	}
	public context_expr(): Context_exprContext | undefined {
		return this.tryGetRuleContext(0, Context_exprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_op_decl; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitOp_decl) {
			return visitor.visitOp_decl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Op_attributeContext extends ParserRuleContext {
	public KW_ONEWAY(): TerminalNode { return this.getToken(IDLParser.KW_ONEWAY, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_op_attribute; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitOp_attribute) {
			return visitor.visitOp_attribute(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Op_type_specContext extends ParserRuleContext {
	public annapps(): AnnappsContext {
		return this.getRuleContext(0, AnnappsContext);
	}
	public param_type_spec(): Param_type_specContext | undefined {
		return this.tryGetRuleContext(0, Param_type_specContext);
	}
	public KW_VOID(): TerminalNode | undefined { return this.tryGetToken(IDLParser.KW_VOID, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_op_type_spec; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitOp_type_spec) {
			return visitor.visitOp_type_spec(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Parameter_declsContext extends ParserRuleContext {
	public LEFT_BRACKET(): TerminalNode { return this.getToken(IDLParser.LEFT_BRACKET, 0); }
	public RIGHT_BRACKET(): TerminalNode { return this.getToken(IDLParser.RIGHT_BRACKET, 0); }
	public param_decl(): Param_declContext[];
	public param_decl(i: number): Param_declContext;
	public param_decl(i?: number): Param_declContext | Param_declContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Param_declContext);
		} else {
			return this.getRuleContext(i, Param_declContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(IDLParser.COMMA);
		} else {
			return this.getToken(IDLParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_parameter_decls; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitParameter_decls) {
			return visitor.visitParameter_decls(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Param_declContext extends ParserRuleContext {
	public annapps(): AnnappsContext[];
	public annapps(i: number): AnnappsContext;
	public annapps(i?: number): AnnappsContext | AnnappsContext[] {
		if (i === undefined) {
			return this.getRuleContexts(AnnappsContext);
		} else {
			return this.getRuleContext(i, AnnappsContext);
		}
	}
	public param_attribute(): Param_attributeContext {
		return this.getRuleContext(0, Param_attributeContext);
	}
	public param_type_spec(): Param_type_specContext {
		return this.getRuleContext(0, Param_type_specContext);
	}
	public simple_declarator(): Simple_declaratorContext {
		return this.getRuleContext(0, Simple_declaratorContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_param_decl; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitParam_decl) {
			return visitor.visitParam_decl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Param_attributeContext extends ParserRuleContext {
	public KW_IN(): TerminalNode | undefined { return this.tryGetToken(IDLParser.KW_IN, 0); }
	public KW_OUT(): TerminalNode | undefined { return this.tryGetToken(IDLParser.KW_OUT, 0); }
	public KW_INOUT(): TerminalNode | undefined { return this.tryGetToken(IDLParser.KW_INOUT, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_param_attribute; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitParam_attribute) {
			return visitor.visitParam_attribute(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Raises_exprContext extends ParserRuleContext {
	public KW_RAISES(): TerminalNode { return this.getToken(IDLParser.KW_RAISES, 0); }
	public LEFT_BRACKET(): TerminalNode { return this.getToken(IDLParser.LEFT_BRACKET, 0); }
	public a_scoped_name(): A_scoped_nameContext[];
	public a_scoped_name(i: number): A_scoped_nameContext;
	public a_scoped_name(i?: number): A_scoped_nameContext | A_scoped_nameContext[] {
		if (i === undefined) {
			return this.getRuleContexts(A_scoped_nameContext);
		} else {
			return this.getRuleContext(i, A_scoped_nameContext);
		}
	}
	public RIGHT_BRACKET(): TerminalNode { return this.getToken(IDLParser.RIGHT_BRACKET, 0); }
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(IDLParser.COMMA);
		} else {
			return this.getToken(IDLParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_raises_expr; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitRaises_expr) {
			return visitor.visitRaises_expr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Context_exprContext extends ParserRuleContext {
	public KW_CONTEXT(): TerminalNode { return this.getToken(IDLParser.KW_CONTEXT, 0); }
	public LEFT_BRACKET(): TerminalNode { return this.getToken(IDLParser.LEFT_BRACKET, 0); }
	public STRING_LITERAL(): TerminalNode[];
	public STRING_LITERAL(i: number): TerminalNode;
	public STRING_LITERAL(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(IDLParser.STRING_LITERAL);
		} else {
			return this.getToken(IDLParser.STRING_LITERAL, i);
		}
	}
	public RIGHT_BRACKET(): TerminalNode { return this.getToken(IDLParser.RIGHT_BRACKET, 0); }
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(IDLParser.COMMA);
		} else {
			return this.getToken(IDLParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_context_expr; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitContext_expr) {
			return visitor.visitContext_expr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Param_type_specContext extends ParserRuleContext {
	public base_type_spec(): Base_type_specContext | undefined {
		return this.tryGetRuleContext(0, Base_type_specContext);
	}
	public string_type(): String_typeContext | undefined {
		return this.tryGetRuleContext(0, String_typeContext);
	}
	public wide_string_type(): Wide_string_typeContext | undefined {
		return this.tryGetRuleContext(0, Wide_string_typeContext);
	}
	public scoped_name(): Scoped_nameContext | undefined {
		return this.tryGetRuleContext(0, Scoped_nameContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_param_type_spec; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitParam_type_spec) {
			return visitor.visitParam_type_spec(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Fixed_pt_typeContext extends ParserRuleContext {
	public KW_FIXED(): TerminalNode { return this.getToken(IDLParser.KW_FIXED, 0); }
	public LEFT_ANG_BRACKET(): TerminalNode { return this.getToken(IDLParser.LEFT_ANG_BRACKET, 0); }
	public positive_int_const(): Positive_int_constContext[];
	public positive_int_const(i: number): Positive_int_constContext;
	public positive_int_const(i?: number): Positive_int_constContext | Positive_int_constContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Positive_int_constContext);
		} else {
			return this.getRuleContext(i, Positive_int_constContext);
		}
	}
	public COMMA(): TerminalNode { return this.getToken(IDLParser.COMMA, 0); }
	public RIGHT_ANG_BRACKET(): TerminalNode { return this.getToken(IDLParser.RIGHT_ANG_BRACKET, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_fixed_pt_type; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitFixed_pt_type) {
			return visitor.visitFixed_pt_type(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Fixed_pt_const_typeContext extends ParserRuleContext {
	public KW_FIXED(): TerminalNode { return this.getToken(IDLParser.KW_FIXED, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_fixed_pt_const_type; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitFixed_pt_const_type) {
			return visitor.visitFixed_pt_const_type(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Value_base_typeContext extends ParserRuleContext {
	public KW_VALUEBASE(): TerminalNode { return this.getToken(IDLParser.KW_VALUEBASE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_value_base_type; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitValue_base_type) {
			return visitor.visitValue_base_type(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Constr_forward_declContext extends ParserRuleContext {
	public KW_STRUCT(): TerminalNode | undefined { return this.tryGetToken(IDLParser.KW_STRUCT, 0); }
	public ID(): TerminalNode { return this.getToken(IDLParser.ID, 0); }
	public KW_UNION(): TerminalNode | undefined { return this.tryGetToken(IDLParser.KW_UNION, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_constr_forward_decl; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitConstr_forward_decl) {
			return visitor.visitConstr_forward_decl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Import_declContext extends ParserRuleContext {
	public annapps(): AnnappsContext[];
	public annapps(i: number): AnnappsContext;
	public annapps(i?: number): AnnappsContext | AnnappsContext[] {
		if (i === undefined) {
			return this.getRuleContexts(AnnappsContext);
		} else {
			return this.getRuleContext(i, AnnappsContext);
		}
	}
	public KW_IMPORT(): TerminalNode { return this.getToken(IDLParser.KW_IMPORT, 0); }
	public imported_scope(): Imported_scopeContext {
		return this.getRuleContext(0, Imported_scopeContext);
	}
	public SEMICOLON(): TerminalNode { return this.getToken(IDLParser.SEMICOLON, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_import_decl; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitImport_decl) {
			return visitor.visitImport_decl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Imported_scopeContext extends ParserRuleContext {
	public scoped_name(): Scoped_nameContext | undefined {
		return this.tryGetRuleContext(0, Scoped_nameContext);
	}
	public STRING_LITERAL(): TerminalNode | undefined { return this.tryGetToken(IDLParser.STRING_LITERAL, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_imported_scope; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitImported_scope) {
			return visitor.visitImported_scope(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Type_id_declContext extends ParserRuleContext {
	public KW_TYPEID(): TerminalNode { return this.getToken(IDLParser.KW_TYPEID, 0); }
	public a_scoped_name(): A_scoped_nameContext {
		return this.getRuleContext(0, A_scoped_nameContext);
	}
	public STRING_LITERAL(): TerminalNode { return this.getToken(IDLParser.STRING_LITERAL, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_type_id_decl; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitType_id_decl) {
			return visitor.visitType_id_decl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Type_prefix_declContext extends ParserRuleContext {
	public KW_TYPEPREFIX(): TerminalNode { return this.getToken(IDLParser.KW_TYPEPREFIX, 0); }
	public a_scoped_name(): A_scoped_nameContext {
		return this.getRuleContext(0, A_scoped_nameContext);
	}
	public STRING_LITERAL(): TerminalNode { return this.getToken(IDLParser.STRING_LITERAL, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_type_prefix_decl; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitType_prefix_decl) {
			return visitor.visitType_prefix_decl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Readonly_attr_specContext extends ParserRuleContext {
	public KW_READONLY(): TerminalNode { return this.getToken(IDLParser.KW_READONLY, 0); }
	public KW_ATTRIBUTE(): TerminalNode { return this.getToken(IDLParser.KW_ATTRIBUTE, 0); }
	public annapps(): AnnappsContext {
		return this.getRuleContext(0, AnnappsContext);
	}
	public param_type_spec(): Param_type_specContext {
		return this.getRuleContext(0, Param_type_specContext);
	}
	public readonly_attr_declarator(): Readonly_attr_declaratorContext {
		return this.getRuleContext(0, Readonly_attr_declaratorContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_readonly_attr_spec; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitReadonly_attr_spec) {
			return visitor.visitReadonly_attr_spec(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Readonly_attr_declaratorContext extends ParserRuleContext {
	public annapps(): AnnappsContext[];
	public annapps(i: number): AnnappsContext;
	public annapps(i?: number): AnnappsContext | AnnappsContext[] {
		if (i === undefined) {
			return this.getRuleContexts(AnnappsContext);
		} else {
			return this.getRuleContext(i, AnnappsContext);
		}
	}
	public simple_declarator(): Simple_declaratorContext[];
	public simple_declarator(i: number): Simple_declaratorContext;
	public simple_declarator(i?: number): Simple_declaratorContext | Simple_declaratorContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Simple_declaratorContext);
		} else {
			return this.getRuleContext(i, Simple_declaratorContext);
		}
	}
	public raises_expr(): Raises_exprContext | undefined {
		return this.tryGetRuleContext(0, Raises_exprContext);
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(IDLParser.COMMA);
		} else {
			return this.getToken(IDLParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_readonly_attr_declarator; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitReadonly_attr_declarator) {
			return visitor.visitReadonly_attr_declarator(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Attr_specContext extends ParserRuleContext {
	public KW_ATTRIBUTE(): TerminalNode { return this.getToken(IDLParser.KW_ATTRIBUTE, 0); }
	public annapps(): AnnappsContext {
		return this.getRuleContext(0, AnnappsContext);
	}
	public param_type_spec(): Param_type_specContext {
		return this.getRuleContext(0, Param_type_specContext);
	}
	public attr_declarator(): Attr_declaratorContext {
		return this.getRuleContext(0, Attr_declaratorContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_attr_spec; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitAttr_spec) {
			return visitor.visitAttr_spec(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Attr_declaratorContext extends ParserRuleContext {
	public annapps(): AnnappsContext[];
	public annapps(i: number): AnnappsContext;
	public annapps(i?: number): AnnappsContext | AnnappsContext[] {
		if (i === undefined) {
			return this.getRuleContexts(AnnappsContext);
		} else {
			return this.getRuleContext(i, AnnappsContext);
		}
	}
	public simple_declarator(): Simple_declaratorContext[];
	public simple_declarator(i: number): Simple_declaratorContext;
	public simple_declarator(i?: number): Simple_declaratorContext | Simple_declaratorContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Simple_declaratorContext);
		} else {
			return this.getRuleContext(i, Simple_declaratorContext);
		}
	}
	public attr_raises_expr(): Attr_raises_exprContext | undefined {
		return this.tryGetRuleContext(0, Attr_raises_exprContext);
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(IDLParser.COMMA);
		} else {
			return this.getToken(IDLParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_attr_declarator; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitAttr_declarator) {
			return visitor.visitAttr_declarator(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Attr_raises_exprContext extends ParserRuleContext {
	public get_excep_expr(): Get_excep_exprContext | undefined {
		return this.tryGetRuleContext(0, Get_excep_exprContext);
	}
	public set_excep_expr(): Set_excep_exprContext | undefined {
		return this.tryGetRuleContext(0, Set_excep_exprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_attr_raises_expr; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitAttr_raises_expr) {
			return visitor.visitAttr_raises_expr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Get_excep_exprContext extends ParserRuleContext {
	public KW_GETRAISES(): TerminalNode { return this.getToken(IDLParser.KW_GETRAISES, 0); }
	public exception_list(): Exception_listContext {
		return this.getRuleContext(0, Exception_listContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_get_excep_expr; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitGet_excep_expr) {
			return visitor.visitGet_excep_expr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Set_excep_exprContext extends ParserRuleContext {
	public KW_SETRAISES(): TerminalNode { return this.getToken(IDLParser.KW_SETRAISES, 0); }
	public exception_list(): Exception_listContext {
		return this.getRuleContext(0, Exception_listContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_set_excep_expr; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitSet_excep_expr) {
			return visitor.visitSet_excep_expr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Exception_listContext extends ParserRuleContext {
	public LEFT_BRACKET(): TerminalNode { return this.getToken(IDLParser.LEFT_BRACKET, 0); }
	public a_scoped_name(): A_scoped_nameContext[];
	public a_scoped_name(i: number): A_scoped_nameContext;
	public a_scoped_name(i?: number): A_scoped_nameContext | A_scoped_nameContext[] {
		if (i === undefined) {
			return this.getRuleContexts(A_scoped_nameContext);
		} else {
			return this.getRuleContext(i, A_scoped_nameContext);
		}
	}
	public RIGHT_BRACKET(): TerminalNode { return this.getToken(IDLParser.RIGHT_BRACKET, 0); }
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(IDLParser.COMMA);
		} else {
			return this.getToken(IDLParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_exception_list; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitException_list) {
			return visitor.visitException_list(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ComponentContext extends ParserRuleContext {
	public component_decl(): Component_declContext | undefined {
		return this.tryGetRuleContext(0, Component_declContext);
	}
	public component_forward_decl(): Component_forward_declContext | undefined {
		return this.tryGetRuleContext(0, Component_forward_declContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_component; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitComponent) {
			return visitor.visitComponent(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Component_forward_declContext extends ParserRuleContext {
	public KW_COMPONENT(): TerminalNode { return this.getToken(IDLParser.KW_COMPONENT, 0); }
	public ID(): TerminalNode { return this.getToken(IDLParser.ID, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_component_forward_decl; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitComponent_forward_decl) {
			return visitor.visitComponent_forward_decl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Component_declContext extends ParserRuleContext {
	public component_header(): Component_headerContext {
		return this.getRuleContext(0, Component_headerContext);
	}
	public LEFT_BRACE(): TerminalNode { return this.getToken(IDLParser.LEFT_BRACE, 0); }
	public component_body(): Component_bodyContext {
		return this.getRuleContext(0, Component_bodyContext);
	}
	public RIGHT_BRACE(): TerminalNode { return this.getToken(IDLParser.RIGHT_BRACE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_component_decl; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitComponent_decl) {
			return visitor.visitComponent_decl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Component_headerContext extends ParserRuleContext {
	public KW_COMPONENT(): TerminalNode { return this.getToken(IDLParser.KW_COMPONENT, 0); }
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public component_inheritance_spec(): Component_inheritance_specContext | undefined {
		return this.tryGetRuleContext(0, Component_inheritance_specContext);
	}
	public supported_interface_spec(): Supported_interface_specContext | undefined {
		return this.tryGetRuleContext(0, Supported_interface_specContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_component_header; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitComponent_header) {
			return visitor.visitComponent_header(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Supported_interface_specContext extends ParserRuleContext {
	public KW_SUPPORTS(): TerminalNode { return this.getToken(IDLParser.KW_SUPPORTS, 0); }
	public a_scoped_name(): A_scoped_nameContext[];
	public a_scoped_name(i: number): A_scoped_nameContext;
	public a_scoped_name(i?: number): A_scoped_nameContext | A_scoped_nameContext[] {
		if (i === undefined) {
			return this.getRuleContexts(A_scoped_nameContext);
		} else {
			return this.getRuleContext(i, A_scoped_nameContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(IDLParser.COMMA);
		} else {
			return this.getToken(IDLParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_supported_interface_spec; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitSupported_interface_spec) {
			return visitor.visitSupported_interface_spec(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Component_inheritance_specContext extends ParserRuleContext {
	public COLON(): TerminalNode { return this.getToken(IDLParser.COLON, 0); }
	public a_scoped_name(): A_scoped_nameContext {
		return this.getRuleContext(0, A_scoped_nameContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_component_inheritance_spec; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitComponent_inheritance_spec) {
			return visitor.visitComponent_inheritance_spec(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Component_bodyContext extends ParserRuleContext {
	public component_export(): Component_exportContext[];
	public component_export(i: number): Component_exportContext;
	public component_export(i?: number): Component_exportContext | Component_exportContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Component_exportContext);
		} else {
			return this.getRuleContext(i, Component_exportContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_component_body; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitComponent_body) {
			return visitor.visitComponent_body(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Component_exportContext extends ParserRuleContext {
	public annapps(): AnnappsContext {
		return this.getRuleContext(0, AnnappsContext);
	}
	public provides_decl(): Provides_declContext | undefined {
		return this.tryGetRuleContext(0, Provides_declContext);
	}
	public SEMICOLON(): TerminalNode | undefined { return this.tryGetToken(IDLParser.SEMICOLON, 0); }
	public uses_decl(): Uses_declContext | undefined {
		return this.tryGetRuleContext(0, Uses_declContext);
	}
	public emits_decl(): Emits_declContext | undefined {
		return this.tryGetRuleContext(0, Emits_declContext);
	}
	public publishes_decl(): Publishes_declContext | undefined {
		return this.tryGetRuleContext(0, Publishes_declContext);
	}
	public consumes_decl(): Consumes_declContext | undefined {
		return this.tryGetRuleContext(0, Consumes_declContext);
	}
	public attr_decl(): Attr_declContext | undefined {
		return this.tryGetRuleContext(0, Attr_declContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_component_export; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitComponent_export) {
			return visitor.visitComponent_export(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Provides_declContext extends ParserRuleContext {
	public KW_PROVIDES(): TerminalNode { return this.getToken(IDLParser.KW_PROVIDES, 0); }
	public interface_type(): Interface_typeContext {
		return this.getRuleContext(0, Interface_typeContext);
	}
	public ID(): TerminalNode { return this.getToken(IDLParser.ID, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_provides_decl; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitProvides_decl) {
			return visitor.visitProvides_decl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Interface_typeContext extends ParserRuleContext {
	public annapps(): AnnappsContext {
		return this.getRuleContext(0, AnnappsContext);
	}
	public scoped_name(): Scoped_nameContext | undefined {
		return this.tryGetRuleContext(0, Scoped_nameContext);
	}
	public KW_OBJECT(): TerminalNode | undefined { return this.tryGetToken(IDLParser.KW_OBJECT, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_interface_type; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitInterface_type) {
			return visitor.visitInterface_type(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Uses_declContext extends ParserRuleContext {
	public KW_USES(): TerminalNode { return this.getToken(IDLParser.KW_USES, 0); }
	public interface_type(): Interface_typeContext {
		return this.getRuleContext(0, Interface_typeContext);
	}
	public ID(): TerminalNode { return this.getToken(IDLParser.ID, 0); }
	public KW_MULTIPLE(): TerminalNode | undefined { return this.tryGetToken(IDLParser.KW_MULTIPLE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_uses_decl; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitUses_decl) {
			return visitor.visitUses_decl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Emits_declContext extends ParserRuleContext {
	public KW_EMITS(): TerminalNode { return this.getToken(IDLParser.KW_EMITS, 0); }
	public a_scoped_name(): A_scoped_nameContext {
		return this.getRuleContext(0, A_scoped_nameContext);
	}
	public ID(): TerminalNode { return this.getToken(IDLParser.ID, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_emits_decl; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitEmits_decl) {
			return visitor.visitEmits_decl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Publishes_declContext extends ParserRuleContext {
	public KW_PUBLISHES(): TerminalNode { return this.getToken(IDLParser.KW_PUBLISHES, 0); }
	public a_scoped_name(): A_scoped_nameContext {
		return this.getRuleContext(0, A_scoped_nameContext);
	}
	public ID(): TerminalNode { return this.getToken(IDLParser.ID, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_publishes_decl; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitPublishes_decl) {
			return visitor.visitPublishes_decl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Consumes_declContext extends ParserRuleContext {
	public KW_CONSUMES(): TerminalNode { return this.getToken(IDLParser.KW_CONSUMES, 0); }
	public a_scoped_name(): A_scoped_nameContext {
		return this.getRuleContext(0, A_scoped_nameContext);
	}
	public ID(): TerminalNode { return this.getToken(IDLParser.ID, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_consumes_decl; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitConsumes_decl) {
			return visitor.visitConsumes_decl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Home_declContext extends ParserRuleContext {
	public home_header(): Home_headerContext {
		return this.getRuleContext(0, Home_headerContext);
	}
	public home_body(): Home_bodyContext {
		return this.getRuleContext(0, Home_bodyContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_home_decl; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitHome_decl) {
			return visitor.visitHome_decl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Home_headerContext extends ParserRuleContext {
	public KW_HOME(): TerminalNode { return this.getToken(IDLParser.KW_HOME, 0); }
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public KW_MANAGES(): TerminalNode { return this.getToken(IDLParser.KW_MANAGES, 0); }
	public a_scoped_name(): A_scoped_nameContext {
		return this.getRuleContext(0, A_scoped_nameContext);
	}
	public home_inheritance_spec(): Home_inheritance_specContext | undefined {
		return this.tryGetRuleContext(0, Home_inheritance_specContext);
	}
	public supported_interface_spec(): Supported_interface_specContext | undefined {
		return this.tryGetRuleContext(0, Supported_interface_specContext);
	}
	public primary_key_spec(): Primary_key_specContext | undefined {
		return this.tryGetRuleContext(0, Primary_key_specContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_home_header; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitHome_header) {
			return visitor.visitHome_header(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Home_inheritance_specContext extends ParserRuleContext {
	public COLON(): TerminalNode { return this.getToken(IDLParser.COLON, 0); }
	public a_scoped_name(): A_scoped_nameContext {
		return this.getRuleContext(0, A_scoped_nameContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_home_inheritance_spec; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitHome_inheritance_spec) {
			return visitor.visitHome_inheritance_spec(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Primary_key_specContext extends ParserRuleContext {
	public KW_PRIMARYKEY(): TerminalNode { return this.getToken(IDLParser.KW_PRIMARYKEY, 0); }
	public a_scoped_name(): A_scoped_nameContext {
		return this.getRuleContext(0, A_scoped_nameContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_primary_key_spec; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitPrimary_key_spec) {
			return visitor.visitPrimary_key_spec(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Home_bodyContext extends ParserRuleContext {
	public LEFT_BRACE(): TerminalNode { return this.getToken(IDLParser.LEFT_BRACE, 0); }
	public RIGHT_BRACE(): TerminalNode { return this.getToken(IDLParser.RIGHT_BRACE, 0); }
	public home_export(): Home_exportContext[];
	public home_export(i: number): Home_exportContext;
	public home_export(i?: number): Home_exportContext | Home_exportContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Home_exportContext);
		} else {
			return this.getRuleContext(i, Home_exportContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_home_body; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitHome_body) {
			return visitor.visitHome_body(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Home_exportContext extends ParserRuleContext {
	public export_(): Export_Context | undefined {
		return this.tryGetRuleContext(0, Export_Context);
	}
	public annapps(): AnnappsContext | undefined {
		return this.tryGetRuleContext(0, AnnappsContext);
	}
	public SEMICOLON(): TerminalNode | undefined { return this.tryGetToken(IDLParser.SEMICOLON, 0); }
	public factory_decl(): Factory_declContext | undefined {
		return this.tryGetRuleContext(0, Factory_declContext);
	}
	public finder_decl(): Finder_declContext | undefined {
		return this.tryGetRuleContext(0, Finder_declContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_home_export; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitHome_export) {
			return visitor.visitHome_export(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Factory_declContext extends ParserRuleContext {
	public KW_FACTORY(): TerminalNode { return this.getToken(IDLParser.KW_FACTORY, 0); }
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public LEFT_BRACKET(): TerminalNode { return this.getToken(IDLParser.LEFT_BRACKET, 0); }
	public RIGHT_BRACKET(): TerminalNode { return this.getToken(IDLParser.RIGHT_BRACKET, 0); }
	public init_param_decls(): Init_param_declsContext | undefined {
		return this.tryGetRuleContext(0, Init_param_declsContext);
	}
	public raises_expr(): Raises_exprContext | undefined {
		return this.tryGetRuleContext(0, Raises_exprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_factory_decl; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitFactory_decl) {
			return visitor.visitFactory_decl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Finder_declContext extends ParserRuleContext {
	public KW_FINDER(): TerminalNode { return this.getToken(IDLParser.KW_FINDER, 0); }
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public LEFT_BRACKET(): TerminalNode { return this.getToken(IDLParser.LEFT_BRACKET, 0); }
	public RIGHT_BRACKET(): TerminalNode { return this.getToken(IDLParser.RIGHT_BRACKET, 0); }
	public init_param_decls(): Init_param_declsContext | undefined {
		return this.tryGetRuleContext(0, Init_param_declsContext);
	}
	public raises_expr(): Raises_exprContext | undefined {
		return this.tryGetRuleContext(0, Raises_exprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_finder_decl; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitFinder_decl) {
			return visitor.visitFinder_decl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class EventContext extends ParserRuleContext {
	public event_decl(): Event_declContext | undefined {
		return this.tryGetRuleContext(0, Event_declContext);
	}
	public event_abs_decl(): Event_abs_declContext | undefined {
		return this.tryGetRuleContext(0, Event_abs_declContext);
	}
	public event_forward_decl(): Event_forward_declContext | undefined {
		return this.tryGetRuleContext(0, Event_forward_declContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_event; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitEvent) {
			return visitor.visitEvent(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Event_forward_declContext extends ParserRuleContext {
	public KW_EVENTTYPE(): TerminalNode { return this.getToken(IDLParser.KW_EVENTTYPE, 0); }
	public ID(): TerminalNode { return this.getToken(IDLParser.ID, 0); }
	public KW_ABSTRACT(): TerminalNode | undefined { return this.tryGetToken(IDLParser.KW_ABSTRACT, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_event_forward_decl; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitEvent_forward_decl) {
			return visitor.visitEvent_forward_decl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Event_abs_declContext extends ParserRuleContext {
	public KW_ABSTRACT(): TerminalNode { return this.getToken(IDLParser.KW_ABSTRACT, 0); }
	public KW_EVENTTYPE(): TerminalNode { return this.getToken(IDLParser.KW_EVENTTYPE, 0); }
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public value_inheritance_spec(): Value_inheritance_specContext {
		return this.getRuleContext(0, Value_inheritance_specContext);
	}
	public LEFT_BRACE(): TerminalNode { return this.getToken(IDLParser.LEFT_BRACE, 0); }
	public RIGHT_BRACE(): TerminalNode { return this.getToken(IDLParser.RIGHT_BRACE, 0); }
	public export_(): Export_Context[];
	public export_(i: number): Export_Context;
	public export_(i?: number): Export_Context | Export_Context[] {
		if (i === undefined) {
			return this.getRuleContexts(Export_Context);
		} else {
			return this.getRuleContext(i, Export_Context);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_event_abs_decl; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitEvent_abs_decl) {
			return visitor.visitEvent_abs_decl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Event_declContext extends ParserRuleContext {
	public event_header(): Event_headerContext {
		return this.getRuleContext(0, Event_headerContext);
	}
	public LEFT_BRACE(): TerminalNode { return this.getToken(IDLParser.LEFT_BRACE, 0); }
	public RIGHT_BRACE(): TerminalNode { return this.getToken(IDLParser.RIGHT_BRACE, 0); }
	public value_element(): Value_elementContext[];
	public value_element(i: number): Value_elementContext;
	public value_element(i?: number): Value_elementContext | Value_elementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Value_elementContext);
		} else {
			return this.getRuleContext(i, Value_elementContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_event_decl; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitEvent_decl) {
			return visitor.visitEvent_decl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Event_headerContext extends ParserRuleContext {
	public KW_EVENTTYPE(): TerminalNode { return this.getToken(IDLParser.KW_EVENTTYPE, 0); }
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public value_inheritance_spec(): Value_inheritance_specContext {
		return this.getRuleContext(0, Value_inheritance_specContext);
	}
	public KW_CUSTOM(): TerminalNode | undefined { return this.tryGetToken(IDLParser.KW_CUSTOM, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_event_header; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitEvent_header) {
			return visitor.visitEvent_header(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AnnappsContext extends ParserRuleContext {
	public annotation_appl(): Annotation_applContext[];
	public annotation_appl(i: number): Annotation_applContext;
	public annotation_appl(i?: number): Annotation_applContext | Annotation_applContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Annotation_applContext);
		} else {
			return this.getRuleContext(i, Annotation_applContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_annapps; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitAnnapps) {
			return visitor.visitAnnapps(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Annotation_applContext extends ParserRuleContext {
	public AT(): TerminalNode { return this.getToken(IDLParser.AT, 0); }
	public scoped_name(): Scoped_nameContext {
		return this.getRuleContext(0, Scoped_nameContext);
	}
	public LEFT_BRACKET(): TerminalNode | undefined { return this.tryGetToken(IDLParser.LEFT_BRACKET, 0); }
	public annotation_appl_params(): Annotation_appl_paramsContext | undefined {
		return this.tryGetRuleContext(0, Annotation_appl_paramsContext);
	}
	public RIGHT_BRACKET(): TerminalNode | undefined { return this.tryGetToken(IDLParser.RIGHT_BRACKET, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_annotation_appl; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitAnnotation_appl) {
			return visitor.visitAnnotation_appl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Annotation_appl_paramsContext extends ParserRuleContext {
	public const_exp(): Const_expContext | undefined {
		return this.tryGetRuleContext(0, Const_expContext);
	}
	public annotation_appl_param(): Annotation_appl_paramContext[];
	public annotation_appl_param(i: number): Annotation_appl_paramContext;
	public annotation_appl_param(i?: number): Annotation_appl_paramContext | Annotation_appl_paramContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Annotation_appl_paramContext);
		} else {
			return this.getRuleContext(i, Annotation_appl_paramContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(IDLParser.COMMA);
		} else {
			return this.getToken(IDLParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_annotation_appl_params; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitAnnotation_appl_params) {
			return visitor.visitAnnotation_appl_params(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Annotation_appl_paramContext extends ParserRuleContext {
	public ID(): TerminalNode { return this.getToken(IDLParser.ID, 0); }
	public EQUAL(): TerminalNode { return this.getToken(IDLParser.EQUAL, 0); }
	public const_exp(): Const_expContext {
		return this.getRuleContext(0, Const_expContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_annotation_appl_param; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitAnnotation_appl_param) {
			return visitor.visitAnnotation_appl_param(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IdentifierContext extends ParserRuleContext {
	public annapps(): AnnappsContext {
		return this.getRuleContext(0, AnnappsContext);
	}
	public ID(): TerminalNode { return this.getToken(IDLParser.ID, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return IDLParser.RULE_identifier; }
	// @Override
	public accept<Result>(visitor: IDLVisitor<Result>): Result {
		if (visitor.visitIdentifier) {
			return visitor.visitIdentifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


