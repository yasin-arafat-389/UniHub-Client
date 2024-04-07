import { useNavigate } from "react-router-dom";
import { IoMdAddCircle } from "react-icons/io";
import { IoLogoGameControllerB } from "react-icons/io";
import { IoMdCloudUpload } from "react-icons/io";

const HeroSection = () => {
  let navigate = useNavigate();
  return (
    <div>
      <section
        className="pt-8 lg:pt-32 pb-20"
        style={{
          backgroundImage: `url("/bg.png")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative text-center">
          <h1 className="text-5xl font-bold">
            Elevating Collaboration and Engagement
          </h1>
          <h1 className="text-5xl mt-5 font-bold">
            in <span className="text-indigo-600">University Activities</span>
          </h1>
          <p className="mt-10 text-center text-2xl font-normal leading-7 text-gray-600 mb-9">
            Empowering Students to Excel in Seamless Projects, <br />
            Group Presentations, and Collaborative Endeavors
          </p>

          <button
            onClick={() => navigate("/view/activities")}
            className="w-[20%] mt-10 mb-20 brightness-150 dark:brightness-100 group hover:shadow-lg hover:shadow-yellow-700/60 transition ease-in-out hover:scale-105 p-1 rounded-xl bg-gradient-to-br from-yellow-800 via-yellow-600 to-yellow-800 hover:from-yellow-700 hover:via-yellow-800 hover:to-yellow-600"
          >
            <div className="px-6 py-4 backdrop-blur-xl bg-black/80 rounded-xl font-bold w-full h-full">
              <div className="group-hover:scale-100 flex justify-center items-center group-hover:text-yellow-500 text-yellow-600 gap-4 text-xl">
                <svg
                  className="w-9 h-9 stroke-yellow-600 group-hover:stroke-yellow-500 group-hover:stroke-{1.99}"
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  ></path>
                </svg>
                See Activities
              </div>
            </div>
          </button>

          <div className="flex justify-center mt-10">
            <img src="/hero.png" className="rounded-lg" />
          </div>
        </div>

        {/* Features section */}
        <div className="mt-28 mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            How It Works
          </h2>
          <p className="max-w-[70%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Create your team for an activity or send joining request to other
            teams, control who you want in your team, upload team resources and
            excel in the activity.
          </p>
        </div>

        <div className="mt-10 w-[90%] mx-auto grid grid-cols-2 gap-10">
          <div>
            <img src="/hero2.png" className="shadow-2xl" />
          </div>

          <div className="grid grid-cols-2 gap-7">
            <div className="bg-white shadow-2xl text-2xl border-2 border-gray-600 rounded-lg">
              <div className="flex flex-col justify-center items-center gap-2 h-full px-8">
                <IoMdAddCircle className="text-4xl text-teal-600" />
                <span>Create your team or join other team.</span>
              </div>
            </div>

            <div className="bg-white shadow-2xl text-2xl border-2 border-gray-600 rounded-lg">
              <div className="flex flex-col justify-center items-center gap-2 h-full px-8">
                <IoLogoGameControllerB className="text-4xl text-teal-600" />
                <span>Control who you want in your team.</span>
              </div>
            </div>

            <div className="bg-white shadow-2xl text-2xl col-span-2 border-2 border-gray-600 rounded-lg">
              <div className="flex flex-col justify-center items-center gap-2 h-full px-8">
                <IoMdCloudUpload className="text-4xl text-teal-600" />
                <span>
                  No more carrying pendrives. Upload team resources and keep all
                  things at one place.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
