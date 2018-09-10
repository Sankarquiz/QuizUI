namespace QuizWebApi.Models.Common
{
    /// <summary>
    /// 
    /// </summary>
    public class DomainConfig
    {
        /// <summary>
        /// Gets or sets the URL.
        /// </summary>
        /// <value>
        /// The URL.
        /// </value>
        public string BaseUrl { get; set; }

        /// <summary>
        /// Gets or sets the activation URL.
        /// </summary>
        /// <value>
        /// The activation URL.
        /// </value>
        public string ActivationUrl { get; set; }
        
        /// <summary>
        /// Gets or sets the home URL.
        /// </summary>
        /// <value>
        /// The home URL.
        /// </value>
        public string HomeUrl { get; set; }
    }
}
