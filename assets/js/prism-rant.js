Prism.languages.rant = {
	'escaped': {
		pattern: /([^\\]|^)".+?"/g,
		alias: 'punctuation',
		lookbehind: true
	},
	'comment': {
		pattern: /\s*#.*?(?=[\r\n]|$)/g
	},
	'equation': {
		pattern: /(``|`)[\s\S]+?\1/g,
		alias: 'string'
	},
	'query': {
		pattern: /<[\s\S]+?>/g,
		alias: 'tag',
		inside: {
			'regex': /\/\/(.*?[^\\])?\/\/i?/ig
		}
	},
	'regex': {
		pattern: /\/\/(.*?[^\\])?\/\/i?/ig,
		inside: {
			'query': /^$/g
		}
	},
	'function': {
		pattern: /(\[)(after|alt|any|arg|before|branch|break|capsinfer|case|chance|char|close|clrt|cmp|define|dist|else|even|extern|first|g|get|group|ifdef|ifndef|is|last|len|merge|middle|notfirst|notlast|notmiddle|nth|num|numfmt|mark|match|odd|osend|out|rep|repcount|repindex|repnum|send|sep|src|step|undef|x|xnew|xnone|xpin|xreset|xseed|xunpin)\b/gi,
		lookbehind: true
	},
	'list': {
		pattern: /\[%[=:][\w;\+]+?\]/g,
		alias: 'entity'
	}
}