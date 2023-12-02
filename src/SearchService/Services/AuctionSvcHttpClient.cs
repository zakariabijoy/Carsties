using MongoDB.Entities;
using SearchService.Models;

namespace SearchService.Services;

public class AuctionSvcHttpClient
{
    private readonly IConfiguration _config;
    private readonly HttpClient _httpClient;
    
    public AuctionSvcHttpClient(HttpClient httpClient, IConfiguration config)
    {
            _httpClient = httpClient;
            _config = config;  
    }

    public async Task<List<Item>> GetItemsForSearchDb()
    {
        var lastUpdate = await DB.Find<Item, string>()
            .Sort(x => x.Descending(a => a.UpdatedAt))
            .Project(x => x.UpdatedAt.ToString())
            .ExecuteFirstAsync();

        return await _httpClient.GetFromJsonAsync<List<Item>>(_config["AuctionServiceUrl"] + "/api/auctions?data=" + lastUpdate);
    }
}
