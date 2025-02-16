'use client'
import useFetch from "./hooks/useFetch";
import { ICoin } from "./interface/Icoin";
import styles from "./page.module.css";
import { flattenAndPick, sortObjectArray } from "./utils/array";

export default function Home() {
  const { data: coins, loading, error } = useFetch<ICoin[][]>('v1/coins');
  if(coins){
    const pickDat = flattenAndPick(coins, 200)
    const sortedData = sortObjectArray(pickDat, 'name', true)
    console.log('sort coin',sortedData)
    console.log('sort coin',sortedData.length)
  }
  return (
    <div className={styles.page}>
      <main className={styles.main}>
         <h1>iran talent task </h1>
      </main>
    </div>
  );
}
