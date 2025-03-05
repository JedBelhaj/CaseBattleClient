import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Item from "./Item";
import { getItemsRarities } from "./utils";
function ItemsOpened({ items }) {
  // const [sort, setSort] = useState("new");
  // const [search, setSearch] = useState("");
  // const [itemsHaving, setItemsHaving] = useState([]);
  // const skinCharacteristics = {
  //   sort: {
  //     new: "Newest first",
  //     value: "Highest value first",
  //     rare: "Rarest first",
  //     wear: "Lowest float first",
  //   },
  //   select: {
  //     statTrack: "StatTrack™",
  //     souvernir: "Souvenir",
  //     stickers: "Stickers Only",
  //     weapons: "Weapon Skins Only",
  //   },
  //   rarities: getItemsRarities(items),
  // };
  console.log(items);

  return (
    <>
      <h1 className="text-yellow-400 text-xl mt-8">Items you Opened:</h1>
      <div className="text-yellow-400 flex gap-4 mt-6 items-center justify-center">
        <FaSearch />
        <input className="text-black" type="text" name="search" id="search" />
        <label htmlFor="sort">Sort By</label>
        {/* <select className="text-black" name="sort" id="sort">
          {Object.entries(skinCharacteristics.sort).map((x) => (
            <option value={x[0]}>{x[1]}</option>
          ))}
        </select> */}
      </div>

      <div className="flex flex-wrap items-center justify-center m-10 overflow-y-scroll max-h-60 gap-4 p-4 w-full">
        {items.map((x, index) => {
          const { skin, luck, rare } = x;

          return <Item key={index} skinData={skin} luck={luck} />;
        })}
      </div>
    </>
  );
}

export default ItemsOpened;
