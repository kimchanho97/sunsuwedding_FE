import cn from "classnames";
import React, { forwardRef } from "react";
import useOpenBottomSheet from "../../hooks/useOpenBottomSheet";
import { comma, uncomma } from "../../utils/convert";

// done test
const ItemsInfo = forwardRef(({ items, setItems }, ref) => {
  const { openBottomSheetHandler } = useOpenBottomSheet();
  const handleOnAddItem = () => {
    if (items.length === 5) {
      openBottomSheetHandler({
        bottomSheet: "messageBottomSheet",
        message: "가격 항목은 최대 5개까지 추가 가능합니다.",
      });

      return;
    }
    setItems([...items, { itemName: "", itemPrice: "0" }]);
  };

  const handleOnRemoveItem = () => {
    if (items.length === 1) return;
    setItems(items.slice(0, items.length - 1));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const [field, index] = name.split("-"); // name을 분석하여 필드와 인덱스 추출
    const updatedPriceItems = [...items];
    if (field === "itemPrice") {
      const newValue = uncomma(value);
      updatedPriceItems[index][field] = comma(newValue);
    } else {
      updatedPriceItems[index][field] = value;
    }
    setItems(updatedPriceItems);
  };

  return (
    <div className="flex flex-col gap-1">
      <h6 className="text-xs">가격</h6>
      {items.map((item, index) => (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          type="text"
          id="price"
          className="w-full flex items-center h-[50px] px-[20px] py-[15px] rounded-[10px] border-lightgray-sunsu border text-sm hover:border-blue-sunsu"
        >
          <input
            type="text"
            placeholder="항목"
            className="w-full focus:outline-none"
            name={`itemName-${index}`}
            value={item?.itemName}
            onChange={handleInputChange}
          />
          <span className=" text-lightgray-sunsu">|</span>
          <div className="w-full flex">
            <input
              type="text"
              name={`itemPrice-${index}`}
              onChange={handleInputChange}
              className={cn("w-full text-right font-bold focus:outline-none")}
              placeholder="0"
              value={item?.itemPrice === "0" ? "" : item?.itemPrice}
              maxLength={11}
            />
            <span>원</span>
          </div>
        </div>
      ))}
      <div className="flex w-full h-[50px] text-sm">
        <button
          ref={ref}
          onClick={handleOnAddItem}
          className="w-full text-center border rounded-s-[10px] border-r-0 border-lightgray-sunsu hover:border-blue-sunsu hover:border-r focus:border-r"
        >
          항목 추가하기
        </button>
        <button
          onClick={handleOnRemoveItem}
          className="w-full text-center border border-lightgray-sunsu rounded-e-[10px] hover:border-blue-sunsu"
        >
          항목 제거하기
        </button>
      </div>
    </div>
  );
});

export default ItemsInfo;
