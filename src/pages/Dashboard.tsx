import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench, Package, Users, TrendingUp, Clock, CheckCircle2, AlertCircle, DollarSign } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();

  const stats = [
    {
      title: 'งานซ่อมวันนี้',
      value: '12',
      icon: Wrench,
      description: '+3 จากเมื่อวาน',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      title: 'งานค้าง',
      value: '8',
      icon: Clock,
      description: 'ต้องเร่งดำเนินการ',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
    },
    {
      title: 'งานเสร็จสิ้น',
      value: '45',
      icon: CheckCircle2,
      description: 'สัปดาห์นี้',
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
    {
      title: 'ยอดขายวันนี้',
      value: '฿18,450',
      icon: DollarSign,
      description: '+12% จากเมื่อวาน',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
  ];

  const recentJobs = [
    { id: 'JOB-001', customer: 'สมชาย ใจดี', device: 'iPhone 14 Pro', issue: 'หน้าจอแตก', status: 'กำลังซ่อม', priority: 'สูง' },
    { id: 'JOB-002', customer: 'วิไล สุขใจ', device: 'Samsung Galaxy S23', issue: 'แบตเตอรี่เสื่อม', status: 'รออะไหล่', priority: 'ปกติ' },
    { id: 'JOB-003', customer: 'ประยุทธ์ มั่นคง', device: 'iPad Air', issue: 'เปิดไม่ติด', status: 'ตรวจสอบ', priority: 'ปกติ' },
  ];

  const lowStockItems = [
    { name: 'หน้าจอ iPhone 14 Pro', current: 2, min: 5, unit: 'ชิ้น' },
    { name: 'แบตเตอรี่ Samsung S23', current: 1, min: 3, unit: 'ชิ้น' },
    { name: 'สายชาร์จ Type-C', current: 8, min: 10, unit: 'เส้น' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">สวัสดี, {user?.name}</h1>
        <p className="text-muted-foreground">ภาพรวมวันนี้ {new Date().toLocaleDateString('th-TH', { dateStyle: 'full' })}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="shadow-sm transition-shadow hover:shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`rounded-lg p-2 ${stat.bgColor}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Jobs */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wrench className="h-5 w-5 text-primary" />
              งานซ่อมล่าสุด
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentJobs.map((job) => (
                <div key={job.id} className="flex items-start justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-medium text-primary">{job.id}</span>
                      {job.priority === 'สูง' && (
                        <span className="rounded-full bg-destructive/10 px-2 py-0.5 text-xs font-medium text-destructive">
                          ด่วน
                        </span>
                      )}
                    </div>
                    <p className="font-medium">{job.customer}</p>
                    <p className="text-sm text-muted-foreground">{job.device} - {job.issue}</p>
                  </div>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    {job.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Low Stock Alert */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-warning" />
              สินค้าใกล้หมด
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lowStockItems.map((item) => (
                <div key={item.name} className="flex items-center justify-between rounded-lg border border-warning/20 bg-warning/5 p-4">
                  <div className="space-y-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      คงเหลือ: <span className="font-semibold text-warning">{item.current}</span> {item.unit} 
                      {' '}(ต่ำกว่าขั้นต่ำ {item.min} {item.unit})
                    </p>
                  </div>
                  <Package className="h-5 w-5 text-warning" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
