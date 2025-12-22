namespace OptiPackBackend.DTOs
{
    public class RegisterDto
    {
        public string FullName { get; set; } = "";
        public string Email { get; set; } = "";
        public string Password { get; set; } = "";
    }

    public class LoginDto
    {
        public string Email { get; set; } = "";
        public string Password { get; set; } = "";
    }

    public class AuthResponseDto
    {
        public string Token { get; set; } = "";
        public string Email { get; set; } = "";
        public int Id { get; set; }

        // Added for Settings integration
        public string Theme { get; set; } = "system";
        public bool Notifications { get; set; } = true;
    }
}
