// use serde::{Deserialize, Serialize};
// use swc_core::ecma::visit::VisitMutWith;

// use super::{
//     compiler::compile_js, error, hash::generate_hash, visitor::transform_visitor::TransformVisitor,
// };

// const IMPORT_SOURCE: &str = "comet";
// const IMPORT_CSS_IDENT: &str = "css";
// const IMPORT_FILE_ID_IDENT: &str = "FILE_ID";
// const CSS_FILE_ID_VARIANT: &str = "FILE_ID";
// const DEFAULT_FILE_ID: &str = "unknown";

// #[derive(Deserialize, Serialize)]
// #[serde(rename_all = "camelCase")]
// pub struct Config {
//     pub filename: String,
//     pub file_id: Option<String>,
//     pub helper: Option<String>,
// }

// #[derive(Deserialize, Serialize)]
// pub struct Output {
//     pub code: String,
//     pub map: String,
//     pub css: String,
// }

// pub fn transform(code: String, config: Config) -> Result<Output, error::Error> {
//     let file_id =
//         generate_hash(&config.file_id.unwrap_or(DEFAULT_FILE_ID.to_string())).map_err(|err| {
//             error::Error {
//                 errors: vec![error::Diagnostic {
//                     message: err.to_string(),
//                 }],
//             }
//         })?;

//     let mut css = String::new();

//     let file_id_decl = format!("${}:{};", &CSS_FILE_ID_VARIANT, &file_id);

//     let helper_css = format!(
//         "{}\n{}",
//         &file_id_decl,
//         config.helper.unwrap_or(String::new())
//     );

//     let import_source = &IMPORT_SOURCE.to_string();
//     let import_css_ident = &IMPORT_CSS_IDENT.to_string();
//     let import_file_id_ident = &IMPORT_FILE_ID_IDENT.to_string();

//     let compile_input = compile_js::Input {
//         code,
//         filename: &config.filename,
//     };

//     let result = compile_js::compile(compile_input, |(module, _)| {
//         let mut module = module;

//         let mut transform_visitor = TransformVisitor::new(
//             import_source,
//             import_css_ident,
//             import_file_id_ident,
//             &file_id,
//             &helper_css,
//         );

//         module.visit_mut_with(&mut transform_visitor);

//         css = transform_visitor.get_css();

//         module
//     });

//     match result {
//         Ok(result) => Ok(Output {
//             code: result.code,
//             map: result.map,
//             css,
//         }),
//         Err(err) => Err(error::Error { errors: err.errors }),
//     }
// }
import type { TransformFn } from "../types/Transform";

const IMPORT_SOURCE = "comet";
const IMPORT_CSS_IDENT = "css";
const IMPORT_FILE_ID_IDENT = "FILE_ID";
const CSS_FILE_ID_VARIANT = "FILE_ID";
const DEFAULT_FILE_ID = "unknown";

export const Transform: TransformFn = (code, config) => {
  const file_id = generate_hash(config?.fileId ?? DEFAULT_FILE_ID);

  let css = "";

  const file_id_decl = `${CSS_FILE_ID_VARIANT}:${file_id};`;

  const theme_css = `${file_id_decl}\n${"" ?? ""}`;

  const import_source = IMPORT_SOURCE;
  const import_css_ident = IMPORT_CSS_IDENT;
  const import_file_id_ident = IMPORT_FILE_ID_IDENT;

  const compile_input = {
    code,
    filename: config?.filename ?? "",
  };

  const result = compile(compile_input);

  return {
    code,
    css: "",
    map: "",
  };
};

const murmur3_32 = (str: string, seed: number) => {
  let hval = seed === undefined ? 0x811c9dc5 : seed;

  for (let i = 0, l = str.length; i < l; i++) {
    hval ^= str.charCodeAt(i);
    hval +=
      (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
  }

  return hval >>> 0;
};

const generate_hash = (input: string) => {
  const hash = murmur3_32(input, 0);
  return hash === 0 ? "" : to_alphabet(hash);
};

const ALPHABET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

const to_alphabet = (value: number) => {
  const result = [];

  while (true) {
    result.push(ALPHABET[value % ALPHABET.length]);
    value = Math.floor(value / ALPHABET.length);

    if (value === 0) {
      break;
    }
  }

  result.reverse();
  return result.join("");
};

// use std::path::Path;
// use std::sync::{Arc, Mutex};
// use swc_core::common;
// use swc_core::common::comments;
// use swc_core::common::errors;
// use swc_core::common::{sync::Lrc, FileName, Globals, SourceMap};
// use swc_core::ecma::ast;
// use swc_core::ecma::codegen;
// use swc_core::ecma::codegen::text_writer::JsWriter;
// use swc_core::ecma::parser::lexer::Lexer;
// use swc_core::ecma::parser::{EsConfig, Parser, StringInput, Syntax, TsConfig};
// use swc_core::ecma::transforms::base::{fixer, hygiene, resolver};
// use swc_core::ecma::visit::FoldWith;

// use crate::error;

// #[derive(Debug, Clone, Default)]
// pub struct ErrorBuffer(Arc<Mutex<Vec<errors::Diagnostic>>>);

// impl errors::Emitter for ErrorBuffer {
//     fn emit(&mut self, diagnostic: &errors::DiagnosticBuilder) {
//         let mut diagnostics = self.0.lock().unwrap();
//         diagnostics.push((**diagnostic).clone());
//     }
// }

// pub struct Input<'a> {
//     pub code: String,
//     pub filename: &'a String,
// }

// pub struct Output {
//     pub code: String,
//     pub map: String,
// }

// pub fn compile<F>(input: Input, mut transform_module: F) -> Result<Output, error::Error>
// where
//     F: FnMut((ast::Module, common::Mark)) -> ast::Module,
// {
//     let code = input.code;
//     let path = Path::new(&input.filename);
//     let filename = FileName::Real(path.to_path_buf());

//     let (is_ts, is_jsx) = parse_file_extension(path);

//     let source_map = Lrc::new(SourceMap::default());
//     let source_file = source_map.new_source_file(filename, code);
//     let comments = comments::SingleThreadedComments::default();

//     let syntax = if is_ts {
//         Syntax::Typescript(TsConfig {
//             tsx: is_jsx,
//             ..Default::default()
//         })
//     } else {
//         Syntax::Es(EsConfig {
//             jsx: is_jsx,
//             ..Default::default()
//         })
//     };

//     let lexer = Lexer::new(
//         syntax,
//         ast::EsVersion::latest(),
//         StringInput::from(&*source_file),
//         Some(&comments),
//     );

//     let mut parser = Parser::new_from(lexer);

//     let module = parser.parse_module();

//     match module {
//         Ok(module) => {
//             let error_buffer = ErrorBuffer::default();

//             let handler =
//                 errors::Handler::with_emitter(true, false, Box::new(error_buffer.clone()));

//             common::GLOBALS.set(&Globals::new(), || {
//                 errors::HANDLER.set(&handler, || {
//                     let mut module = module;

//                     let top_level_mark = common::Mark::new();
//                     let unresolved_mark = common::Mark::new();

//                     module =
//                         module.fold_with(&mut resolver(unresolved_mark, top_level_mark, is_ts));

//                     module = transform_module((module, top_level_mark));

//                     module = module.fold_with(&mut hygiene::hygiene_with_config(hygiene::Config {
//                         top_level_mark,
//                         ..Default::default()
//                     }));

//                     module = module.fold_with(&mut fixer::fixer(Some(&comments)));

//                     let mut wr_buf = Vec::new();
//                     let mut src_map_buf = Vec::new();
//                     let mut mapping_buf = Vec::new();

//                     let mut emitter = codegen::Emitter {
//                         cfg: codegen::Config {
//                             minify: false,
//                             target: ast::EsVersion::latest(),
//                             ascii_only: false,
//                             omit_last_semi: false,
//                         },
//                         comments: Some(&comments),
//                         cm: Lrc::clone(&source_map),
//                         wr: Box::new(JsWriter::new(
//                             Lrc::clone(&source_map),
//                             "\n",
//                             &mut wr_buf,
//                             Some(&mut mapping_buf),
//                         )),
//                     };

//                     let _ = emitter.emit_module(&module);
//                     let source_map = source_map.build_source_map(&mapping_buf);
//                     let _ = source_map.to_writer(&mut src_map_buf);

//                     let code = String::from_utf8(wr_buf).unwrap();
//                     let source_map = String::from_utf8(src_map_buf).unwrap();

//                     let errors = handle_error(&error_buffer);

//                     if errors.is_empty() {
//                         Ok(Output {
//                             code,
//                             map: source_map,
//                         })
//                     } else {
//                         Err(error::Error { errors })
//                     }
//                 })
//             })
//         }
//         Err(err) => {
//             let error_buffer = ErrorBuffer::default();
//             let handler =
//                 errors::Handler::with_emitter(true, false, Box::new(error_buffer.clone()));
//             err.into_diagnostic(&handler).emit();

//             let errors = handle_error(&error_buffer);
//             Err(error::Error { errors })
//         }
//     }
// }

// /// (is_ts, is_jsx)
// fn parse_file_extension(path: &Path) -> (bool, bool) {
//     if let Some(extension) = path.extension() {
//         if let Some(extension_str) = extension.to_str() {
//             match extension_str {
//                 "js" => return (false, false),
//                 "ts" => return (true, false),
//                 "jsx" => return (false, true),
//                 "tsx" => return (true, true),
//                 _ => return (true, true),
//             }
//         }
//     }
//     (true, true)
// }

// fn handle_error(error_buffer: &ErrorBuffer) -> Vec<error::Diagnostic> {
//     let diagnostics = error_buffer.0.lock().unwrap();

//     diagnostics
//         .iter()
//         .map(|diagnostic| error::Diagnostic {
//             message: diagnostic.message(),
//         })
//         .collect()
// }

import { readFileSync } from "fs";

export type InputCompile = {
  code: string;
  filename: string;
};

export type OutputCompile = {
  code: string;
  map: string;
};

export type CompileFn = (module: any, top_level_mark: any) => any;

export const compile = (input: InputCompile, f?: CompileFn) => {
  let code = input.code;
  let path = input.filename;
  let filename = readFileSync(path, "utf-8");

  const [is_ts, is_jsx] = parse_file_extension(path);

  const source_map = new Map();
  const source_file = source_map.set(filename, code);
  const comments = new Map();

  const syntax = is_ts;
};

export const parse_file_extension = (path: string) => {
  const extension = path.split(".").pop();
  if (extension === "js") return [false, false];
  if (extension === "ts") return [true, false];
  if (extension === "jsx") return [false, true];
  if (extension === "tsx") return [true, true];
  return [true, true];
};
