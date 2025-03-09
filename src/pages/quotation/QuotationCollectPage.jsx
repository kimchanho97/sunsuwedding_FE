import QuotationCollectHeader from "../../components/quotation/QuotationCollectHeader";
import NoQuotationCollect from "../../components/quotation/NoQuotationCollect";

const QuotationCollectPage = () => {
  return (
    <div className="flex w-full h-full flex-col">
      <QuotationCollectHeader />
      <NoQuotationCollect />
      {/* <QuotationCollectTemplate /> */}
    </div>
  );
};

export default QuotationCollectPage;
