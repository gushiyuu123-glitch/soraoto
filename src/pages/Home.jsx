import { useIsSp } from "../hooks/useIsSp";
import HomePc from "./HomePc";
import HomeSp from "./HomeSp";

export default function Home() {
  const isSp = useIsSp(900); // ←境界は好みで変えてOK
  return isSp ? <HomeSp /> : <HomePc />;
}