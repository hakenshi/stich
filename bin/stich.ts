import { Command } from "commander";
import { makeComponent } from "../commands/makeComponent";

const program = new Command()

program.name("stich").description("Stich CLI - Nextjs and React development tools").version("0.1.0")

program.command('init <project>')
    .description("Helps you caffold a new NextJS or a new vite with react project.")
    .option("--template", "template", 'next')
    .option('--with-orm', 'orm', '')
    .option("--with-prettier", 'withPrettier', '')
    .action((project, options) => {
        if(options.template){
            
        }       
    })    

program.command("make:component <name>")
    .description("Creates an empty react component")
    .option('--with-children', "withChildren", '')
    .option('--with-props', "withProps", '')
    .option('--with-styles', "withStyles", '')
    .action(makeComponent)

program.command('deploy')
    .description('Deploys this project to vercel.')

program.parse(process.argv)