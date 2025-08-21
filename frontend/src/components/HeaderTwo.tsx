import { Link } from "react-router";
import { ModeToggle } from "./mode-toggle";
import { ArrowLeft } from "lucide-react";

const HeaderTwo = () => {
  return (
    <header className="flex flex-row justify-between items-center border-b">
      <Link className="py-4 px-5" to={"/"}>
        <ArrowLeft size={18}  />
      </Link>
      <div className="py-4 px-5">
        <ModeToggle />
      </div>
    </header>
  );
};

export default HeaderTwo;
