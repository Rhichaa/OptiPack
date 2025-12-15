namespace OptiPackBackend.Models
{
    public class ProductMaster
    {
        public int Id { get; set; }
        public string ProductName { get; set; }
        public string Category { get; set; }
        public double Weight { get; set; }
        public double Length { get; set; }
        public double Width { get; set; }
        public double Height { get; set; }
        public string Fragility { get; set; }
    }
}