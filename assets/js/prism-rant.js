var rantModes = [
	"lower", "upper", "sentence", "word", "title", "none",
	"normal", "roman(?:[-_](?:upper|lower))?", "group(?:[-_](?:commas|dots))?", "verbal[-_]en",
	"locked", "c?deck", "ordered", "reverse",
	"public", "private", "internal",
	"different", "(?:not[-_])?equal", "less", "greater", "none", "one", "all", "any"
].join("|");

var rantFunctions = [
	"[rs](?:ep)?", "n", "num", "after", "alt", "any", "arg", "before", "branch", "b", "break", "capsinfer", "case", "caps",
	"chance", "char", "close", "clrt", "cmp", "define", "dist", "else", "even", "extern", "(?:not)?first", "g", "generation",
	"get", "group", "if[n]?def", "is", "(?:not)?last", "len", "merge", "m", "(?:not)?middle", "nth", "numfmt", "mark", "match",
	"odd", "osend", "out", "repcount", "rc", "repindex", "ri", "repnum", "rn", "send", "src", "step", "undef", "x", "xnew",
	"xnone", "xpin", "xreset", "xseed", "xunpin"
	].join("|");

Prism.languages.rant = {
	'escaped': {
		pattern: /\\((?:\d+,)?(?:[^u\s\r\n]|u[0-9a-f]{4}))/,
		alias: 'punctuation'
	},
	'constliteral': {
		pattern: /(^|[^\\])("(?:(?:[^"]|"")*)?")/,
		alias: 'string',
		lookbehind: true
	},
	'comment': {
		pattern: /#.*/
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
		pattern: new RegExp("((?:^|[^\\\\])\\[)([$]\\w+|" + rantFunctions + ")(?:[:\\]])", "i"),
		lookbehind: true
	},
	'modename': {
		pattern: new RegExp("([:;]\\s*)(" + rantModes + ")\\s*(?=[;\\]])", "i"),
		alias: 'keyword',
		lookbehind: true
	},
	'list': {
		pattern: /((?:^|[^\\])\[)(%[:=!]?\w+)(\s*(?:\+\^?\%?|\=\@?|![@^$]?|\$\^?|\@[?^$]?))?/,
		alias: 'entity',
		lookbehind: true
	}
}