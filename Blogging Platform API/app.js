import express from "express";
import{savePost, readPosts, verifyFields, saveUpdatedPosts} from "./functions.js";

const app = express(); git 
app.use(express.json());
app.post('/posts', (req, res) => {
    let myBody = req.body;
    if(!verifyFields(myBody, res)) return;
    myBody.createdAt = new Date().toUTCString();
    myBody.updatedAt = new Date().toUTCString();
    const myBodyWithId = {id: Date.now(), ...myBody};
    savePost(myBodyWithId);
    return res.status(201).json(myBodyWithId);
})
app.put('/posts/:postId', async (req, res) => {
    const posts = await readPosts();
    const post = posts.find(p => p.id === parseInt(req.params.postId));
    if(!post){
        res.sendStatus(404);
        return;
    }
    const updatedFields = req.body;
    if(!verifyFields(updatedFields, res)) return;
    post.title = req.body.title;
    post.content = req.body.content;
    post.category = req.body.category;
    post.tags = req.body.tags;
    post.updatedAt = new Date().toUTCString();
    saveUpdatedPosts(posts);
    return res.status(200).json(post);
})
app.delete('/posts/:postId', async(req, res) => {
    const posts = await readPosts();
    const postToDelete = posts.find(p => p.id === parseInt(req.params.postId));
    if(!postToDelete) return res.sendStatus(404);
    const filtredPosts = posts.filter((post) => post.id !== parseInt(req.params.postId));
    saveUpdatedPosts(filtredPosts);
    return res.sendStatus(204);
})
app.get('/posts/:postId', async (req, res) => {
    const posts = await readPosts();
    const getedPost = posts.find(p => p.id === parseInt(req.params.postId));
    if(!getedPost) return res.sendStatus(404);
    return res.status(200).json(getedPost);
})
app.get('/posts', async (req, res) => {
    const posts = await readPosts();
    let searchTerm = req.query.search;
    if(!searchTerm) return res.status(200).json(posts);
    searchTerm = searchTerm.toLowerCase();
    const filtredPosts_title = posts.filter(post => post.title.toLowerCase().includes(searchTerm));
    const filtredPosts_content = posts.filter(post => post.content.toLowerCase().includes(searchTerm));
    const filtredPosts_category = posts.filter(post => post.category.toLowerCase().includes(searchTerm));
    const merged = [...filtredPosts_title, ...filtredPosts_content, ...filtredPosts_category];
    const seen = new Set(); //Crée un nouvel objet Set qui permet de stocker des valeurs sans doublons sssi ces doublons sont identiques par référence
    //Vu qu'on peut avoir des objets qui ne sont pas identiques par référence (cas du third post qui se retrouve à la fois dans filtredPosts_title et dans filtredPosts_category dans l'un de mes essais), j'ai filtré en fonction des id dans la fonction ci-dessous
    const filtredPosts = merged.filter(post => {
        if(seen.has(post.id)) return false;
        seen.add(post.id);
        return true;
    }); 
    if(filtredPosts.length === 0) return res.sendStatus(404);
    return res.status(200).json(filtredPosts);
})
app.listen(3000, () => {
    console.log('The server is launched');  
})