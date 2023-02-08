import React from "react";
import { Routes ,Route } from 'react-router-dom';


import SkillCv from "../my-content-containers/cv-content/skill-cv/skill-cv";
import ExperienceCv from "../my-content-containers/cv-content/experience-cv/experience-cv";
import ProjectCv from "../my-content-containers/cv-content/project-cv/project-cv";
import ProjectAddCv from "../my-content-containers/cv-content/project-add-cv/project-add-cv";
import GeneralCategoryBlog from "../my-content-containers/blog-content/general-category-blog/general-category-blog";
import CategoryBlog from "../my-content-containers/blog-content/category-blog/category-blog";
import TagsBlog from "../my-content-containers/blog-content/tags-blog/tags-blog";
import PostListsBlog from "../my-content-containers/blog-content/post-lists-blog/post-lists-blog";
import PostAddBlog from "../my-content-containers/blog-content/post-add-blog/post-add-blog";
import ChickenSoupBlog from "../my-content-containers/blog-content/chicken-soup-blog/chicken-soup-blog";
import ListBook from "../my-content-containers/book-content/list-book/list-book";
import ContentBook from "../my-content-containers/book-content/content-book/content-book";
import DiaryContent from "../my-content-containers/diary-content/diary-content";
import IndexContent from "../my-content-containers/index-content/index-content";
import User from "../my-content-containers/user-content/user";
import LoveContent from "../my-content-containers/love-content/love-content";

export default function MyContent(){

    return (
        <>

            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>

                <Routes>
                    <Route exact={true} path={""} element={<IndexContent/>} />
                    <Route path={"cv"} >
                        <Route  path={"skill"} element={<SkillCv />} />
                        <Route  path={"experience"} element={<ExperienceCv />} />
                        <Route  exact={true} path={"project"} element={<ProjectCv />} />
                        <Route  path={"project/add"} element={<ProjectAddCv />} />
                    </Route>

                    <Route path={"blog"} >
                        <Route  path={"generalCate"} element={<GeneralCategoryBlog />} />
                        <Route  path={"category"} element={<CategoryBlog />} />
                        <Route  path={"tags"} element={<TagsBlog />} />
                        <Route  path={"postList"} element={<PostListsBlog />} />
                        <Route  path={"postAdd"} element={<PostAddBlog />} />
                        <Route  path={"chickenSoup"} element={<ChickenSoupBlog />} />
                    </Route>


                    <Route path={"book"} >
                        <Route  path={"bookList"} element={<ListBook />} />
                        <Route  path={"bookContent"} element={<ContentBook />} />
                    </Route>

                    <Route path={"diary"} element={<DiaryContent/>} />
                    <Route path={"user"} element={<User/>} />
                    <Route path={"love"} element={<LoveContent/>} />
                </Routes>

            </div>
        </>
    )
}