java -jar tools/SoyToJsSrcCompiler.jar --outputPathFormat app/js/templates.js --srcs app/templates/templates.soy
lessc -x --yui-compress app/templates/style.less app/css/style.css