import { comma } from "../../utils/convert";

const PriceInfoRow = ({ totalPrice, items }) => {
  return (
    <div className="max-w-[260px] ml-auto text-lg">
      {items?.map((item, idx) => (
        // eslint-disable-next-line react/no-array-index-key
        <div className="flex" key={idx}>
          <div className="inline text-blue-sunsu">{item.itemName}</div>
          <div className="inline ml-auto">
            <em className="font-bold not-italic">{comma(item.itemPrice)}</em>원
          </div>
        </div>
      ))}
      <div className="flex border-t mt-1 pt-1">
        <div className="inline text-blue-sunsu">합계</div>
        <div className="inline ml-auto">
          <em className="font-bold not-italic">{comma(totalPrice)}</em>원
        </div>
      </div>
    </div>
  );
};

export default PriceInfoRow;
