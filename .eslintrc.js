module.exports = {
	"env": {
		"es2021": true,
		"browser": true
	},
	"extends": [
		"eslint:recommended",
	],
	"overrides": [
		{
			"env": {
				"node": true
			},
			"files": [
				".eslintrc.{js,cjs}"
			],
			"parserOptions": {
				"sourceType": "script"
			}
		}
	],
	"plugins": [
		"html",
	],
	"rules": {
		"indent": [
			"error",
			"tab"
		],
		"no-tabs": 0
	}
}
