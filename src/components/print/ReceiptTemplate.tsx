interface ReceiptItem {
  name: string;
  quantity: number;
  price: number;
  total: number;
}

interface ReceiptData {
  receiptNo: string;
  date: string;
  customer?: string;
  phone?: string;
  items: ReceiptItem[];
  subtotal: number;
  discount: number;
  total: number;
}

interface ReceiptTemplateProps {
  data: ReceiptData;
}

export function ReceiptTemplate({ data }: ReceiptTemplateProps) {
  return (
    <div className="max-w-[80mm] mx-auto p-4 font-mono text-sm print:p-0">
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="text-lg font-bold">FixFlow Mobile Repair</h1>
        <p className="text-xs">123 ถนนสุขุมวิท แขวงคลองเตย</p>
        <p className="text-xs">เขตคลองเตย กรุงเทพฯ 10110</p>
        <p className="text-xs">โทร: 02-123-4567</p>
      </div>

      <div className="border-t border-dashed border-foreground my-2" />

      {/* Receipt Info */}
      <div className="space-y-1 text-xs mb-2">
        <div className="flex justify-between">
          <span>เลขที่:</span>
          <span className="font-bold">{data.receiptNo}</span>
        </div>
        <div className="flex justify-between">
          <span>วันที่:</span>
          <span>{data.date}</span>
        </div>
        {data.customer && (
          <>
            <div className="flex justify-between">
              <span>ลูกค้า:</span>
              <span>{data.customer}</span>
            </div>
            {data.phone && (
              <div className="flex justify-between">
                <span>เบอร์:</span>
                <span>{data.phone}</span>
              </div>
            )}
          </>
        )}
      </div>

      <div className="border-t border-dashed border-foreground my-2" />

      {/* Items */}
      <div className="space-y-1 text-xs mb-2">
        {data.items.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between">
              <span className="flex-1">{item.name}</span>
            </div>
            <div className="flex justify-between pl-2">
              <span>
                {item.quantity} x ฿{item.price.toLocaleString()}
              </span>
              <span>฿{item.total.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-dashed border-foreground my-2" />

      {/* Summary */}
      <div className="space-y-1 text-xs mb-2">
        <div className="flex justify-between">
          <span>ยอดรวม:</span>
          <span>฿{data.subtotal.toLocaleString()}</span>
        </div>
        {data.discount > 0 && (
          <div className="flex justify-between">
            <span>ส่วนลด:</span>
            <span>-฿{data.discount.toLocaleString()}</span>
          </div>
        )}
        <div className="flex justify-between font-bold text-base">
          <span>ยอดชำระ:</span>
          <span>฿{data.total.toLocaleString()}</span>
        </div>
      </div>

      <div className="border-t border-dashed border-foreground my-2" />

      {/* Footer */}
      <div className="text-center text-xs space-y-1">
        <p>ขอบคุณที่ใช้บริการ</p>
        <p>รับประกัน 30 วัน</p>
        <p className="text-[10px]">กรุณาเก็บใบเสร็จไว้เป็นหลักฐาน</p>
      </div>
    </div>
  );
}
