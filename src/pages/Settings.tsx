import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import {
  Store,
  Users,
  Bell,
  Printer,
  Shield,
  Palette,
  Save,
} from 'lucide-react';
import { Switch } from '@/components/ui/switch';

export default function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">ตั้งค่า</h1>
        <p className="text-muted-foreground">จัดการการตั้งค่าระบบและร้านค้า</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings Menu */}
        <div className="space-y-2">
          {[
            { icon: Store, label: 'ข้อมูลร้าน', active: true },
            { icon: Users, label: 'จัดการผู้ใช้', active: false },
            { icon: Bell, label: 'การแจ้งเตือน', active: false },
            { icon: Printer, label: 'การพิมพ์', active: false },
            { icon: Shield, label: 'ความปลอดภัย', active: false },
            { icon: Palette, label: 'การแสดงผล', active: false },
          ].map((item) => (
            <Button
              key={item.label}
              variant={item.active ? 'default' : 'ghost'}
              className="w-full justify-start gap-2"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Button>
          ))}
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Store Information */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>ข้อมูลร้าน</CardTitle>
              <CardDescription>
                ข้อมูลร้านค้าจะแสดงในใบเสร็จและเอกสารต่างๆ
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="shopName">ชื่อร้าน *</Label>
                <Input id="shopName" defaultValue="FixFlow Mobile Repair" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="shopPhone">เบอร์โทรศัพท์ *</Label>
                <Input id="shopPhone" defaultValue="02-123-4567" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="shopEmail">อีเมล</Label>
                <Input
                  id="shopEmail"
                  type="email"
                  defaultValue="info@fixflow.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="shopAddress">ที่อยู่ *</Label>
                <Textarea
                  id="shopAddress"
                  rows={3}
                  defaultValue="123 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="taxId">เลขประจำตัวผู้เสียภาษี</Label>
                <Input id="taxId" defaultValue="0-1234-56789-01-2" />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="warrantyTerms">เงื่อนไขการรับประกัน</Label>
                <Textarea
                  id="warrantyTerms"
                  rows={4}
                  defaultValue="1. รับประกัน 30 วัน สำหรับงานซ่อมทุกชนิด&#10;2. รับประกัน 90 วัน สำหรับอะไหล่แท้&#10;3. ไม่รับประกันความเสียหายจากการตกกระแทก น้ำเข้า&#10;4. กรุณานำใบรับซ่อมมาทุกครั้งเพื่อรับประกัน"
                />
              </div>

              <Button className="gap-2">
                <Save className="h-4 w-4" />
                บันทึกข้อมูล
              </Button>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>การแจ้งเตือน</CardTitle>
              <CardDescription>
                ตั้งค่าการแจ้งเตือนสำหรับเหตุการณ์ต่างๆ
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>แจ้งเตือนงานใหม่</Label>
                  <p className="text-sm text-muted-foreground">
                    เมื่อมีงานซ่อมใหม่เข้ามา
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>แจ้งเตือนสต็อกต่ำ</Label>
                  <p className="text-sm text-muted-foreground">
                    เมื่อสินค้าใกล้หมด
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>แจ้งเตือนเคลม</Label>
                  <p className="text-sm text-muted-foreground">
                    เมื่อมีการเปิดเคลมใหม่
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>แจ้งเตือนทางอีเมล</Label>
                  <p className="text-sm text-muted-foreground">
                    ส่งอีเมลสรุปรายวัน
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          {/* Print Settings */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>การตั้งค่าการพิมพ์</CardTitle>
              <CardDescription>
                กำหนดขนาดกระดาษและรูปแบบการพิมพ์
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>พิมพ์อัตโนมัติหลังชำระเงิน</Label>
                  <p className="text-sm text-muted-foreground">
                    พิมพ์ใบเสร็จทันทีเมื่อชำระเงินเสร็จ
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>แสดงโลโก้ในเอกสาร</Label>
                  <p className="text-sm text-muted-foreground">
                    แสดงโลโก้ร้านในใบเสร็จและเอกสาร
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>ขนาดกระดาษ</Label>
                <Input defaultValue="A4 (210 x 297 mm)" readOnly />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
