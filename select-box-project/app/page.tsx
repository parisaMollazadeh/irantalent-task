'use client';
import SelectBox from "./components/select-box/select-box";
import useFetch from "./hooks/useFetch";
import { ICoin } from "./interface/ICoin";
import styles from "./page.module.css";
import { flattenAndPick, sortObjectArray } from "./utils/array";

export default function Home() {
  const { data: coins, loading, error } = useFetch<ICoin[][]>("v1/coins");

  const handleSelectionChange = (selectedItems: { id: string; name: string }[]) => {
    console.log("Selected items:", selectedItems);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data.</div>;

  // Flatten and pick data, then sort by name using sortObjectArray
  const options =
    coins &&
    sortObjectArray(flattenAndPick(coins, 200), "name", true);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {options && <>
          <SelectBox
            title="Industry"
            options={options}
            onChange={handleSelectionChange}
            multiSelect={true}
            showSearch={true}
          />

        {/* single select option without search*/}
          {/* <SelectBox
            title="Industry"
            options={options}
            onChange={handleSelectionChange}
            multiSelect={false}
            showSearch={false}
          /> */}
        </>
        }
      </main>
    </div>
  );
}
