MODULES = ./node_modules/.bin
STYLUS = $(MODULES)/stylus
BABEL = $(MODULES)/babel
POSTCSS = $(MODULES)/postcss
PUG = $(MODULES)/pug
BS = $(MODULES)/browser-sync

OUTPUT_DIR = ./public
SRC_BASE = src

SCRIPT_FILE = *.js
STYLE_FILE = index.styl
MARKUP_FILE = index.pug

SCRIPT_DEST = $(OUTPUT_DIR)

POSTCSS_OPTS = $(OUTPUT_DIR)/index.css --use autoprefixer -d $(OUTPUT_DIR)

SCRIPT_SRC = $(SRC_BASE)
MARKUP_SRC = $(SRC_BASE)/$(MARKUP_FILE)
README_SRC = $(SRC_BASE)/$(README_FILE)
MARKUP_COMPILE_SRC = $(SRC_BASE)/${MARKUP_FILE}
MARKUP_DEV_SRC = $(SRC_BASE)/$(MARKUP_DEV_FILE)
STYLE_SRC = $(SRC_BASE)/$(STYLE_FILE)

help:
	@grep -E '^[a-zA-Z\._-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

# Compile javascript using babel and copy to respective pen folder in public.
compile-script: ## compiles scripts
	mkdir -pv $(OUTPUT_DIR)
	$(BABEL) src --out-dir public

watch-script: compile-script ## watch for script changes and compile
	$(BABEL) $(SCRIPT_SRC) --watch --out-dir $(SCRIPT_DEST)

compile-style: ## compiles styles
	$(STYLUS) $(STYLE_SRC) -o $(OUTPUT_DIR) && $(POSTCSS) $(POSTCSS_OPTS)

watch-style: compile-style ## watches and compiles styles
	$(STYLUS) -w $(STYLE_SRC) -o $(OUTPUT_DIR)

compile-markup: ## compiles markup
	$(PUG) -P $(MARKUP_COMPILE_SRC) -o $(OUTPUT_DIR)

watch-markup: compile-markup ## watch and compile markup
	$(PUG) -wP $(MARKUP_COMPILE_SRC) -o $(OUTPUT_DIR)

publish:
	mkdir -pv dist
	$(BABEL) src/worklet.js --out-dir dist

setup: ## set up project for development
	npm install

watch: ## run development watch
	make watch-script & make watch-style & make watch-markup

build: ## build sources
	make compile-script && make compile-style && make compile-markup

serve: build ## sets up browser-sync local static server with livereload
	$(BS) start --port 1987 --files $(OUTPUT_DIR)/ --server $(OUTPUT_DIR) --no-online --debug

develop: ## run development task for given PEN "make develop PEN=A"
	make serve & make watch