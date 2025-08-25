import { Link } from "react-router-dom";
import type { Lp } from "../../types/lp";
import TimeAgo from "../getTime";

interface LpCardProps {
  lp: Lp;
}

const LpCard = ({ lp }: LpCardProps) => {
  return (
    <div className="relative overflow-hidden transition-transform duration-300 cursor-pointer hover:z-10 group hover:scale-120">
      <Link to={`/lp/${lp.id}`}>
        <img
          src={lp.thumbnail}
          alt={lp.title}
          className="object-cover w-full h-50"
          loading="lazy"
        />
        <div className="absolute inset-0 flex flex-col justify-end px-4 py-4 text-left transition duration-300 opacity-0 justify-items-start bg-gradient-to-t from-black/100 to-transparent group-hover:opacity-100">
          <h2 className="mb-2 text-lg font-bold text-white line-clamp-2">
            {lp.title}
          </h2>
          <TimeAgo
            className="text-sm text-white line-clamp-2"
            dateString={lp.updatedAt}
          />
        </div>
      </Link>
    </div>
  );
};

export default LpCard;
