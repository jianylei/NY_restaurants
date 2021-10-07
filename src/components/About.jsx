import CardMain from "./CardMain";

export default function About() {
    const body = (
        <p className="about-body">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam iusto aliquam ad et accusantium distinctio quae. Culpa architecto provident nostrum sequi, molestias, quaerat assumenda impedit animi ab modi at laborum facere possimus temporibus tempore voluptatibus odit quis eum ipsum qui cupiditate nobis, reiciendis sit aliquam. Sint provident eligendi facilis. Accusamus?
        </p>
    )
    return (
        <CardMain head="About" subHead="All about me - the developer." body={body} />
    )
}