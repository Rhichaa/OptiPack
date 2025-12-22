namespace OptiPackBackend.DTOs
{
    public class SettingsDto
    {
        public int UserId { get; set; }
        public bool Notifications { get; set; }
        public string Theme { get; set; } = "system";
    }
}