using Microsoft.AspNetCore.Mvc;
using Backend.OutboundResources;
using System.Collections.Generic;
using Backend.Persistence;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class ViewsController : ControllerBase
    {
        private readonly IDataManager _dataManager;
        public ViewsController(IDataManager dataManager)
        {
            this._dataManager = dataManager;
        }
        
        // GET api/views/{username}
        [HttpGet("{username}")]
        public IActionResult Get(string username)
        {
            var view = _dataManager.GetView(username);
            return Ok(view);
        }

        // POST api/views
        [HttpPost]
        public void Post([FromBody] MapView view)
        {
            _dataManager.UpdateView(view);
        }

        // POST api/views/sharemapview
        [HttpPost("sharemapview")]
        public void ShareMapView([FromBody] SharedView view)
        {
            _dataManager.ShareMapView(view);
        }

    }
}