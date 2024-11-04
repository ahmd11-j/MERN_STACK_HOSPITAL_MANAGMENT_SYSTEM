
import Hero from "../components/Hero.jsx"
import Biography from "../components/Biography.jsx"
import Department from "../components/Department.jsx"
import MessageForm from "../components/MessageForm.jsx"


const Home = () => {
  return (
    <>
    <Hero title={"Welcome to medical center!"} imageUrl={"/hero.png"} />
    <Biography imageUrl={"/about.png"}/>
    <Department/>
    <MessageForm/>

    </>
  )
}

export default Home
