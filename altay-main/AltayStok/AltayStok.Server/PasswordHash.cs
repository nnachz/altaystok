using System.Security.Cryptography;
using System.Text;

public interface IPasswordHasher
{
    string HashPassword(string password, out byte[] salt);
    bool VerifyPassword(string enteredPassword, string storedHash, byte[] salt);
}

public class PasswordHasher : IPasswordHasher
{
    private const int keySize = 32;
    private const int iterations = 35000;
    private static readonly HashAlgorithmName hashAlgorithm = HashAlgorithmName.SHA512;

    public string HashPassword(string password, out byte[] salt)
    {
        salt = RandomNumberGenerator.GetBytes(keySize);
        var hash = Rfc2898DeriveBytes.Pbkdf2(
            Encoding.UTF8.GetBytes(password),
            salt,
            iterations,
            hashAlgorithm,
            keySize);
        return Convert.ToHexString(hash);
    }

    public bool VerifyPassword(string enteredPassword, string storedHash, byte[] salt)
    {
        var hashToCompare = Rfc2898DeriveBytes.Pbkdf2(enteredPassword, salt, iterations, hashAlgorithm, keySize);
        return CryptographicOperations.FixedTimeEquals(hashToCompare, Convert.FromHexString(storedHash));
    }
}
