import {
  Button,
  ChakraProvider,
  Checkbox,
  Flex,
  Input,
  Text,
} from "@chakra-ui/react";
import "./App.css";
import { useEffect, useState } from "react";

type Record = {
  id: number;
  titel: string;
  amount: number;
  isIncome: boolean;
};

function App() {
  const [recordes, setRecordes] = useState<Record[]>([]);
  const [titel, setTitel] = useState("");
  const [amount, setAmount] = useState(0);
  const [isIncome, setIsIncome] = useState(false);

  useEffect(() => {
    getRecords();
  }, []);

  async function getRecords() {
    try {
      const response = await fetch("http://localhost:3000/recordes");
      const data = await response.json();
      setRecordes(data);
    } catch (error) {
      console.error("Error fetching records:", error);
    }
  }

  const addRecord = () => {
    const newRecord: Record = {
      id: recordes.length + 1,
      titel: titel,
      amount: amount,
      isIncome: isIncome,
    };

    setRecordes([...recordes, newRecord]);
    setTitel("");
    setAmount(0);
    setIsIncome(false);
  };

  return (
    <ChakraProvider>
      <div>
        <Text fontSize="2xl">家計簿アプリ</Text>
        <div>
          <Input
            placeholder="タイトルを入力"
            mb="4px"
            onChange={(e) => setTitel(e.target.value)}
            value={titel}
          />
          <Input
            placeholder="金額を入力"
            mb="4px"
            type="number"
            onChange={(e) => setAmount(Number(e.target.value))}
            value={amount === 0 ? "" : amount}
          />
          <Flex align="center" justifyContent="space-between">
            <Checkbox
              onChange={() => setIsIncome(!isIncome)}
              isChecked={isIncome}
            >
              入金
            </Checkbox>
            <Button colorScheme="blue" onClick={addRecord}>
              追加
            </Button>
          </Flex>
        </div>
        <div>
          {recordes.map((record) => (
            <div key={record.id}>
              <Flex align="center" justifyContent="space-between">
                <Text>{record.titel}</Text>
                <Text>
                  {record.isIncome ? "+" : "-"}
                  {record.amount}
                </Text>
              </Flex>
            </div>
          ))}
        </div>
      </div>
    </ChakraProvider>
  );
}

export default App;
