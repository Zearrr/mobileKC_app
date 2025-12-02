import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate, useParams } from 'react-router-dom';

// (สมมุติรับ params id และ mock ข้อมูล)
const mockClaims = [
  {
    id: 'CLM-001', refType: 'งานซ่อม', refCode: 'REP-2024-001', customer: 'สมชาย ใจดี', device: 'iPhone 14 Pro', issue: 'หน้าจอแตกหลังซ่อม', status: 'กำลังดำเนินการ', statusColor: 'bg-warning text-warning-foreground', date: '2024-01-18', estimateCost: 2500,
  },
  {
    id: 'CLM-002', refType: 'การขาย', refCode: 'SAL-2024-045', customer: 'วิไล สุขใจ', device: 'Samsung Galaxy S23', issue: 'แบตเตอรี่บวม', status: 'รอเอกสาร', statusColor: 'bg-secondary text-secondary-foreground', date: '2024-01-17', estimateCost: 1800,
  },
  {
    id: 'CLM-003', refType: 'งานซ่อม', refCode: 'REP-2024-003', customer: 'ประยุทธ์ มั่นคง', device: 'iPad Air', issue: 'ซ่อมแล้วยังเปิดไม่ติด', status: 'อนุมัติแล้ว', statusColor: 'bg-success text-success-foreground', date: '2024-01-15', estimateCost: 3200,
  },
  {
    id: 'CLM-004', refType: 'การขาย', refCode: 'SAL-2024-032', customer: 'สุภา ดีงาม', device: 'AirPods Pro', issue: 'เสียงข้างซ้ายไม่ดัง', status: 'ปฏิเสธ', statusColor: 'bg-destructive text-destructive-foreground', date: '2024-01-14', estimateCost: 0,
  },
];

export default function ClaimDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const claim = mockClaims.find((c) => c.id === id) || mockClaims[0]; // fallback ตัวแรกหากไม่เจอ

  return (
    <div className="max-w-2xl mx-auto p-8">
      <Card>
        <CardHeader>
          <CardTitle>รายละเอียดเคลม <span className="ml-2 text-primary font-mono">{claim.id}</span></CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div><span className="font-semibold">ลูกค้า: </span>{claim.customer}</div>
            <div><span className="font-semibold">อ้างอิง: </span>{claim.refType} / {claim.refCode}</div>
            <div><span className="font-semibold">อุปกรณ์: </span>{claim.device}</div>
            <div><span className="font-semibold">อาการ: </span>{claim.issue}</div>
            <div><span className="font-semibold">สถานะ: </span><Badge className={claim.statusColor}>{claim.status}</Badge></div>
            <div><span className="font-semibold">วันที่: </span>{new Date(claim.date).toLocaleDateString('th-TH')}</div>
            <div><span className="font-semibold">ประเมินค่าใช้จ่าย: </span>{claim.estimateCost>0 ? `฿${claim.estimateCost.toLocaleString()}` : '-'}</div>
          </div>
          <hr/>
          <div className="text-right">
            <Button variant="outline" onClick={()=>navigate(-1)}>ย้อนกลับ</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


