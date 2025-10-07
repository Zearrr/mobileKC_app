interface JobReceiptData {
  jobCode: string;
  date: string;
  customer: string;
  phone: string;
  device: string;
  issue: string;
  estimatePrice: number;
  deposit: number;
  note?: string;
}

interface JobReceiptTemplateProps {
  data: JobReceiptData;
}

export function JobReceiptTemplate({ data }: JobReceiptTemplateProps) {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-background print:p-4">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">ใบรับซ่อม</h1>
          <p className="text-muted-foreground">FixFlow Mobile Repair</p>
          <p className="text-sm text-muted-foreground">123 ถนนสุขุมวิท แขวงคลองเตย</p>
          <p className="text-sm text-muted-foreground">เขตคลองเตย กรุงเทพฯ 10110</p>
          <p className="text-sm text-muted-foreground">โทร: 02-123-4567</p>
        </div>
        <div className="text-right">
          <div className="bg-primary text-primary-foreground px-4 py-2 rounded-lg mb-2">
            <p className="text-sm">เลขที่</p>
            <p className="text-xl font-bold font-mono">{data.jobCode}</p>
          </div>
          <p className="text-sm text-muted-foreground">
            วันที่: {data.date}
          </p>
        </div>
      </div>

      <div className="border-t-2 border-border my-6" />

      {/* Customer Info */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">ข้อมูลลูกค้า</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">ชื่อลูกค้า</p>
            <p className="font-medium">{data.customer}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">เบอร์โทรศัพท์</p>
            <p className="font-medium">{data.phone}</p>
          </div>
        </div>
      </div>

      {/* Device Info */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">ข้อมูลอุปกรณ์</h2>
        <div className="space-y-3">
          <div>
            <p className="text-sm text-muted-foreground">อุปกรณ์</p>
            <p className="font-medium">{data.device}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">อาการ/ปัญหา</p>
            <p className="font-medium">{data.issue}</p>
          </div>
          {data.note && (
            <div>
              <p className="text-sm text-muted-foreground">หมายเหตุ</p>
              <p className="font-medium">{data.note}</p>
            </div>
          )}
        </div>
      </div>

      {/* Pricing */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">ค่าใช้จ่าย</h2>
        <div className="space-y-2">
          <div className="flex justify-between p-3 bg-muted rounded-lg">
            <span>ประเมินราคา</span>
            <span className="font-bold">฿{data.estimatePrice.toLocaleString()}</span>
          </div>
          <div className="flex justify-between p-3 bg-muted rounded-lg">
            <span>มัดจำ</span>
            <span className="font-bold text-primary">฿{data.deposit.toLocaleString()}</span>
          </div>
          <div className="flex justify-between p-3 bg-primary text-primary-foreground rounded-lg">
            <span className="font-semibold">คงค้างชำระ</span>
            <span className="font-bold text-xl">
              ฿{(data.estimatePrice - data.deposit).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Terms */}
      <div className="mb-6 p-4 bg-muted rounded-lg">
        <h3 className="font-semibold mb-2">เงื่อนไขการรับซ่อม</h3>
        <ul className="text-sm space-y-1 text-muted-foreground">
          <li>• รับประกันงานซ่อม 30 วัน สำหรับอาการเดิม</li>
          <li>• กรุณานำใบรับซ่อมมาทุกครั้งเพื่อรับเครื่อง</li>
          <li>• หากไม่มารับเครื่องภายใน 3 เดือน ทางร้านจะไม่รับผิดชอบ</li>
          <li>• ทางร้านไม่รับผิดชอบข้อมูลในเครื่อง กรุณาสำรองข้อมูลก่อนส่งซ่อม</li>
        </ul>
      </div>

      {/* Signatures */}
      <div className="grid grid-cols-2 gap-8 mt-12">
        <div className="text-center">
          <div className="border-t-2 border-border pt-2 mt-16">
            <p className="font-medium">ผู้รับซ่อม</p>
            <p className="text-sm text-muted-foreground">(...........................)</p>
            <p className="text-sm text-muted-foreground">วันที่ ......../......../........</p>
          </div>
        </div>
        <div className="text-center">
          <div className="border-t-2 border-border pt-2 mt-16">
            <p className="font-medium">ลูกค้า</p>
            <p className="text-sm text-muted-foreground">(...........................)</p>
            <p className="text-sm text-muted-foreground">วันที่ ......../......../........</p>
          </div>
        </div>
      </div>
    </div>
  );
}
