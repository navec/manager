const common = [
  "features/**/*.feature",
  `--format-options '{"snippetInterface": "synchronous"}'`,
  "--require-module ts-node/register",
  "--require-module tsconfig-paths/register",
  "--require ./features/**/*.ts",
  "--require ./features/*.ts",
  "--format progress",
].join(" ");

module.exports = {
  default: common,
};
