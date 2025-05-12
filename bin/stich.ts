import { Command } from "commander";
import { makeComponent } from "../commands/makeComponent";

const program = new Command()

program.name("stich").description("Stich CLI - Nextjs and React development tools").version("0.1.0")

program.command("make:component <name>")
    .description("Creates an empty react component")
    .option('--with-children', "withChildren", '')
    .option('--with-props', "withProps", '')
    .option('--with-styles', "withStyles", '')
    .action(makeComponent)

program.parse(process.argv)