using Microsoft.AspNetCore.Mvc;

namespace Portfolio.Controllers
{
    public class PortfolioController : Controller
    {
        [Route("/")]
        public IActionResult Index()
        {
            ViewData["PageTitle"] = "Home Page";
            return View();
        }
        [Route("about")]
        public IActionResult About()
        {
            ViewData["PageTitle"] = "About Page";
            return View();
        }
        [Route("contact")]
        public IActionResult Contact()
        {
            ViewData["PageTitle"] = "Contact Page";
            return View();
        }
        [Route("skills")]
        public IActionResult Skills()
        {
            ViewData["PageTitle"] = "Skills Page";
            return View();
        }
    }
}