namespace SpSecondHandModels
{
    public class RespondObject<T>
    {
        public string Message { get; set; }

        public T Data { get; set; }
    }
}
