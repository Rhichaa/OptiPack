namespace OptiPackBackend.DTOs
{
    public class AIProductDto
    {
        public string Name { get; set; }

        // ✅ REQUIRED (category-based logic)
        public string Category { get; set; }

        public string Fragility { get; set; }
        public float Weight { get; set; }

        // length, width, height
        public float[] Dimensions { get; set; }
    }
}