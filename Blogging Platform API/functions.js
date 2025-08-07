import{writeFile, readFile, truncate} from "node:fs/promises";
import{fileURLToPath} from "node:url";
import{dirname, join} from "node:path"; 

const dataBasePath = join(dirname(fileURLToPath(import.meta.url)), 'data base.json');
export async function savePost(post){
    const data = await readFile(dataBasePath, {encoding:'utf8'});
    const parsedData = JSON.parse(data);
    parsedData.push(post);
    await writeFile(dataBasePath, JSON.stringify(parsedData, null, 3)); 
}
export async function readPosts(){
   const posts = await readFile(dataBasePath, {encoding:'utf8'});
   const parsedPosts = JSON.parse(posts);
   return parsedPosts;
}
export function verifyFields(theBody, response){
    if(!theBody || typeof theBody !== 'object'){
        response.status(400).send('Invalid request Body');
        return;
    }
    const requiredFields = ['title', 'content', 'category', 'tags'];
    for(let field of requiredFields){
        if(!theBody[field]){
            response.status(400).send(`Missing field ${field}`);
            return;
        }
    }
    for(let property in theBody){
        if(property !== 'tags'){
            if(typeof(theBody[property]) !== 'string'){
                response.status(400).send(`${property} field must be a string`);
                return;
            }
        }else{
            if(!Array.isArray(theBody[property])){
                response.status(400).send(`${property} field must be an array of strings`);
                return;
            }
        }
    }
    return true;
}
export async function saveUpdatedPosts(posts){
    await truncate(dataBasePath);
    await writeFile(dataBasePath, JSON.stringify(posts, null, 3));
}
