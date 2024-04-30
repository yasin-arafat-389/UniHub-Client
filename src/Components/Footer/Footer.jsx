const Footer = () => {
  return (
    <div>
      <footer className="bg-gray-100">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="flex justify-center text-teal-600 sm:justify-start">
              <img src="/logo.png" className="w-[150px] cursor-pointer" />
            </div>
            <div className="mt-4 flex gap-2 justify-center items-center text-center text-lg text-gray-600 lg:mt-0 lg:text-right">
              Made with{" "}
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                className="text-red-700"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path>
              </svg>{" "}
              by{" "}
              <a
                href="https://yasin-arafat-389.github.io/portfolio"
                target="_blank"
                rel="noreferrer"
                className="hover:text-blue-600 hover:underline cursor-pointer"
              >
                Yasin Arafat
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
