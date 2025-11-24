import CardsPart from './dashboard_feature/CardsPart';
import TopPart from './dashboard_feature/TopPart';

const DashboardPage = () => {
  return (
    <div className=" mt-2 gap-2.5 flex flex-col">
      <TopPart />
      <div className="overflow-y-auto h-[55vh] custom-scrollbar pb-10">
        <CardsPart />
      </div>
    </div>
  );
};

export default DashboardPage;
