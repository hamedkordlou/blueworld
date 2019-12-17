using System.Collections.Generic;
using Backend.OutboundResources;
using Backend.Persistence;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SharedViewsController : ControllerBase
    {
        private readonly IDataManager _dataManager;
        public SharedViewsController(IDataManager dataManager)
        {
            this._dataManager = dataManager;
        }

        // GET api/sharedviews/{username}
        [HttpGet("{username}")]
        public ActionResult Get(string username)
        {
            var list = _dataManager.GetSharedViews(username);
            return Ok(list);
        }

    }
}