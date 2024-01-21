import { OpenAI} from 'langchain/llms/openai';
import { StructuredOutputParser } from 'langchain/output_parsers'
import z from 'zod';
import { PromptTemplate } from 'langchain/prompts';
import { Content } from 'next/font/google';

const parser = StructuredOutputParser.fromZodSchema(
      z.object({
            mood: z.string().describe('mood of the person who wrote the journal.'),
            subject: z.string().describe('The subject of the journal entry'),
            summary: z.string().describe('quick summary of the entire entry.'),
            negative: z.boolean().describe('is this entry negative? (i.e does it contain negative emotions?).'),
            color: z.string().describe('a hexadcimal color code that represents the mood of the entry. Example #0101fe for blue representing happiness.'),
      })
);

const getPrompt = async (content) => {
      const format_instructions = parser.getFormatInstructions();

      const prompt = new PromptTemplate({
            template: 'Analyze the following journal entry. Follow the instructions and format your response to match the format instructions, no matter what! \n {format_instructions}\n{entry}',
            inputVariables: ['entry'],
            partialVariables: { format_instructions },
      });

      const input = await prompt.format({
            entry: content,
      });

      console.log('input here' + input);
      return input;
}

export const analyze = async (content) => {
      const input = await getPrompt(content);
      const model = new OpenAI({temperature: 0, modelName: 'gpt-3.5-turbo'})
      const result = await model.invoke(input);
      console.log(result);
}