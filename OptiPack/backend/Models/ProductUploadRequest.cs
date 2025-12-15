namespace OptiPackBackend.Models
{
    public class ProductUploadRequest
    {
        public IFormFile ImageFile { get; set; }
        public string ProductName { get; set; }
        public string ProductCode { get; set; }
    }
}
