import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";

const QuantityControl = ({ item, onAdd, onIncrease, onDecrease }) => {
    const [itemQuantities, setItemQuantities] = useState({});
  
    const handleAddClick = (item) => {
      if (!itemQuantities[item.id]) {
        setItemQuantities((prev) => ({
          ...prev,
          [item.id]: 1,
        }));
        onAdd({ ...item, quantity: 1 });
      }
    };
  
    const handleQuantityChange = (item, change) => {
      const currentQty = itemQuantities[item.id] || 0;
      const newQty = Math.max(0, currentQty + change);
  
      setItemQuantities((prev) => ({
        ...prev,
        [item.id]: newQty,
      }));
  
      if (newQty === 0) {
        setItemQuantities((prev) => {
          const newState = { ...prev };
          delete newState[item.id];
          return newState;
        });
      }
  
      // Using passed-in prop methods for custom behavior
      if (change > 0 && onIncrease) {
        onIncrease({ ...item, quantity: newQty });
      } else if (change < 0 && onDecrease) {
        onDecrease({ ...item, quantity: newQty });
      }
  
      onAdd({ ...item, quantity: newQty });
    };
  
    return (
      <div>
        {!itemQuantities[item.id] ? (
          <button
            onClick={() => handleAddClick(item)}
            className={`w-fit px-5 py-2 font-semibold text-white text-xs rounded-full flex gap-2 items-center justify-center ${
              item.isDeleted === 1 || item.status === "Tidak Tersedia"
                ? "bg-slate-400 cursor-not-allowed"
                : "bg-orange-600"
            }`}
            disabled={item.isDeleted === 1 || item.status === "Tidak Tersedia"}
          >
            <PlusIcon className="size-3" />
            Tambah
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleQuantityChange(item, -1)}
              className="w-fit p-2 font-semibold text-white text-xs rounded-full bg-red-600"
            >
              <MinusIcon className="size-3" />
            </button>
  
            <span>{itemQuantities[item.id]}</span>
  
            <button
              onClick={() => handleQuantityChange(item, 1)}
              className="w-fit p-2 font-semibold text-white text-xs rounded-full bg-orange-600"
            >
              <PlusIcon className="size-3" />
            </button>
          </div>
        )}
      </div>
    );
  };
  
  export default QuantityControl;
  