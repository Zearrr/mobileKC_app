import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  FileText,
  TrendingUp,
  Calendar,
  Download,
  BarChart3,
  PieChart,
} from 'lucide-react';

const reportCategories = [
  {
    title: 'รายงานงานซ่อม',
    description: 'สรุปงานซ่อมตามช่วงเวลา สถานะ และประเภท',
    icon: FileText,
    color: 'text-primary',
  },
  {
    title: 'รายงานการขาย',
    description: 'ยอดขายสินค้าและอะไหล่ รายได้ กำไร',
    icon: TrendingUp,
    color: 'text-success',
  },
  {
    title: 'รายงานคลังสินค้า',
    description: 'สต็อกสินค้า การเคลื่อนไหว สินค้าขายดี',
    icon: BarChart3,
    color: 'text-warning',
  },
  {
    title: 'รายงานลูกค้า',
    description: 'ลูกค้าประจำ ประวัติการซื้อและซ่อม',
    icon: PieChart,
    color: 'text-accent',
  },
  {
    title: 'รายงานการเงิน',
    description: 'รายรับ-รายจ่าย กระแสเงินสด งบกำไรขาดทุน',
    icon: TrendingUp,
    color: 'text-destructive',
  },
  {
    title: 'รายงานเคลม/ประกัน',
    description: 'สถานะเคลม ค่าใช้จ่าย อัตราการอนุมัติ',
    icon: FileText,
    color: 'text-secondary',
  },
];

const quickReports = [
  { name: 'งานซ่อมวันนี้', value: '12 งาน', change: '+3' },
  { name: 'ยอดขายวันนี้', value: '฿45,600', change: '+18%' },
  { name: 'งานรอดำเนินการ', value: '8 งาน', change: '-2' },
  { name: 'สินค้าใกล้หมด', value: '5 รายการ', change: '+1' },
];

export default function Reports() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">รายงาน</h1>
          <p className="text-muted-foreground">
            รายงานและสถิติต่างๆ ของระบบ
          </p>
        </div>
        <Button className="gap-2">
          <Calendar className="h-4 w-4" />
          เลือกช่วงเวลา
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickReports.map((report) => (
          <Card key={report.name} className="shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{report.name}</p>
                  <p className="text-2xl font-bold mt-1">{report.value}</p>
                </div>
                <Badge
                  variant="outline"
                  className={
                    report.change.startsWith('+')
                      ? 'text-success border-success'
                      : 'text-muted-foreground'
                  }
                >
                  {report.change}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Report Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reportCategories.map((category) => (
          <Card
            key={category.title}
            className="shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-muted">
                    <category.icon className={`h-5 w-5 ${category.color}`} />
                  </div>
                  <div>
                    <CardTitle className="text-base">{category.title}</CardTitle>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {category.description}
              </p>
              <Button variant="outline" size="sm" className="w-full gap-2">
                <Download className="h-3 w-3" />
                ดูรายงาน
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Reports */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>รายงานที่ส่งออกล่าสุด</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                name: 'รายงานยอดขายประจำเดือน ม.ค. 2567',
                date: '20 ม.ค. 2567',
                size: '245 KB',
              },
              {
                name: 'รายงานงานซ่อมสัปดาห์ที่ 3',
                date: '18 ม.ค. 2567',
                size: '128 KB',
              },
              {
                name: 'รายงานสต็อกสินค้าประจำเดือน',
                date: '15 ม.ค. 2567',
                size: '189 KB',
              },
            ].map((report, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{report.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {report.date} • {report.size}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
