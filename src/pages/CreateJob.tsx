import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useCallback, useState } from 'react';

export default function CreateJob() {
  // State ตัวอย่าง (mock only)
  const [brand, setBrand] = useState('');
  const [lockType, setLockType] = useState('none');
  const [pattern, setPattern] = useState<number[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  // mouse event สำหรับ pattern
  const startPattern = (n: number) => {
    setPattern([n]);
    setIsDragging(true);
  };
  const addPattern = (n: number) => {
    setPattern((prev) => {
      if (prev[prev.length - 1] === n) {
        // ถ้าซ้ำ node ล่าสุด ข้ามเลย
        return prev;
      } else if (prev.includes(n)) {
        // ถ้ากด/ลาก node เดิม ให้รีเซ็ต pattern ใหม่โดยให้เริ่มจาก node นั้น
        setIsDragging(false);
        setPattern([n]);
        return [n];
      }
      return [...prev, n];
    });
  };
  const endPattern = () => {
    setIsDragging(false);
  };
  const handlePatternReset = useCallback(() => setPattern([]), []);

  const gridSize = 3;
  const nodeSize = 48; // tailwind w-12 h-12, px
  const gap = 16; // tailwind gap-4, px
  const getNodePos = (idx: number) => {
    // idx: 0-8, จัดเป็น 0-based 3x3
    const row = Math.floor(idx / gridSize);
    const col = idx % gridSize;
    return {
      x: col * (nodeSize + gap) + nodeSize / 2,
      y: row * (nodeSize + gap) + nodeSize / 2,
    };
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-8">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>เปิดงานใหม่</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* ข้อมูลลูกค้า */}
          <section className="space-y-3">
            <h2 className="font-bold">ข้อมูลลูกค้า</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>ชื่อลูกค้า *</Label>
                <Input required placeholder="ชื่อ-นามสกุล" />
              </div>
              <div>
                <Label>เบอร์โทรศัพท์ *</Label>
                <Input required placeholder="081-234-5678" />
              </div>
              <div>
                <Label>Line ID</Label>
                <Input placeholder="Line ID" />
              </div>
              <div>
                <Label>เบอร์โทรสำรอง</Label>
                <Input placeholder="เบอร์โทรสำรอง" />
              </div>
            </div>
          </section>
          <Separator />
          {/* ข้อมูลอุปกรณ์ */}
          <section className="space-y-3">
            <h2 className="font-bold">ข้อมูลอุปกรณ์</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>ยี่ห้อ *</Label>
                <Input required placeholder="เลือกยี่ห้อ" value={brand} onChange={e=>setBrand(e.target.value)} />
              </div>
              <div>
                <Label>รุ่น *</Label>
                <Input required placeholder="เช่น iPhone 12" />
              </div>
              <div>
                <Label>สี</Label>
                <Input placeholder="สี" />
              </div>
              <div>
                <Label>IMEI</Label>
                <Input placeholder="IMEI" />
              </div>
              <div>
                <Label>Serial</Label>
                <Input placeholder="Serial" />
              </div>
              <div>
                <Label>รหัสล็อค</Label>
                <div className="space-y-2">
                  <Label className="mb-1">ประเภทรหัสล็อค:</Label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input type="radio" name="lockType" value="none" checked={lockType === 'none'} onChange={()=>setLockType('none')} /> ไม่มีรหัส
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="lockType" value="pin" checked={lockType === 'pin'} onChange={()=>setLockType('pin')} /> PIN
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="lockType" value="pattern" checked={lockType === 'pattern'} onChange={()=>setLockType('pattern')} /> Pattern
                    </label>
                  </div>
                  {lockType === 'pin' && (
                    <Input className="mt-1" placeholder="PIN" />
                  )}
                  {lockType === 'pattern' && (
                    <div>
                      <Label className="mt-3 block">วาดรูปแบบรหัสล็อค:</Label>
                      <div
                        className="flex flex-col items-center gap-5 mt-2 mb-3 select-none"
                        onMouseLeave={endPattern}
                      >
                        <div
                          className="relative"
                          style={{ width: (nodeSize+gap)*3-gap, height: (nodeSize+gap)*3-gap }}
                        >
                          {/* เส้น SVG ด้านหลัง */}
                          <svg
                            className="absolute left-0 top-0 pointer-events-none"
                            width={(nodeSize+gap)*3-gap}
                            height={(nodeSize+gap)*3-gap}
                          >
                            {pattern.length > 1 && pattern.map((n, i, arr) => {
                              if (i === 0) return null;
                              const from = getNodePos(arr[i-1]-1); // ใช้ pattern = 1-based
                              const to = getNodePos(arr[i]-1);
                              return (
                                <line
                                  key={"line-"+i}
                                  x1={from.x}
                                  y1={from.y}
                                  x2={to.x}
                                  y2={to.y}
                                  stroke="#22c55e"
                                  strokeWidth="4"
                                  strokeLinecap="round"
                                />
                              );
                            })}
                          </svg>
                          {/* grid ปุ่ม 3x3 อยู่ foreground */}
                          <div className="grid grid-cols-3 gap-4 absolute left-0 top-0 w-full h-full">
                            {[1,2,3,4,5,6,7,8,9].map(n => (
                              <button
                                type="button"
                                key={n}
                                className={`w-12 h-12 rounded-full border-2 ${pattern.includes(n) ? 'bg-green-500 text-white border-green-600 shadow-lg' : 'bg-white text-blue-700 border-blue-400'} flex items-center justify-center text-xl transition-all relative z-10`}
                                onMouseDown={() => startPattern(n)}
                                onMouseEnter={() => isDragging && !pattern.includes(n) && addPattern(n)}
                                onMouseUp={endPattern}
                                onClick={() => {
                                  if (pattern.length > 0 && isDragging && pattern.includes(n)) {
                                    setPattern([n]); setIsDragging(false);
                                  }
                                }}
                                style={{userSelect:'none'}}
                              >
                                {n}
                              </button>
                            ))}
                          </div>
                        </div>
                        <Button size="sm" variant="outline" type="button" onClick={handlePatternReset}>ล้างรูปแบบ</Button>
                      </div>
                      {pattern.length > 0 && (
                        <div className="text-sm text-muted-foreground mt-1">รูปแบบที่เลือก: {pattern.join(' → ')}</div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
          <Separator />
          {/* รายละเอียดอาการเสีย */}
          <section className="space-y-3">
            <h2 className="font-bold">รายละเอียดอาการเสีย</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label>อาการเสีย *</Label>
                <Textarea required placeholder="อธิบายอาการเสียของอุปกรณ์" />
              </div>
              <div className="md:col-span-2">
                <Label>อุปกรณ์ที่รับมา</Label>
                <Input placeholder="เช่น สายชาร์จ, หูฟัง, กล่อง" />
              </div>
              <div className="md:col-span-2">
                <Label>ผลการตรวจสอบเบื้องต้น</Label>
                <Textarea placeholder="ผลการตรวจสอบเบื้องต้น" />
              </div>
            </div>
          </section>
          <Separator />
          {/* ประเมินราคา */}
          <section className="space-y-3">
            <h2 className="font-bold">การประเมินราคา</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label>อะไหล่ที่ต้องเปลี่ยน (ค้นหา/เลือกหลายรายการ)</Label>
                <Input placeholder="เลือกอะไหล่..." />
              </div>
              <div>
                <Label>ราคาอะไหล่ (บาท)</Label>
                <Input type="number" min={0} defaultValue={0} />
              </div>
              <div>
                <Label>มัดจำ (บาท)</Label>
                <Input type="number" min={0} defaultValue={0} />
              </div>
              <div>
                <Label>ยอดรวม</Label>
                <Input readOnly value={0} />
              </div>
              <div>
                <Label>คงเหลือ</Label>
                <Input readOnly value={0} />
              </div>
            </div>
          </section>
          <Separator />
          {/* การจัดส่ง/ข้อมูลช่าง */}
          <section className="space-y-3">
            <h2 className="font-bold">ข้อมูลการจัดส่ง</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label>กำหนดส่ง</Label>
                <Input type="date" />
              </div>
              <div>
                <Label>วันรับประกัน</Label>
                <Input type="number" defaultValue={30} />
              </div>
              <div>
                <Label>ช่างซ่อม</Label>
                <Input placeholder="ชื่อช่างซ่อม" />
              </div>
            </div>
          </section>
          <div className="pt-4 flex justify-end">
            <Button type="submit">บันทึกงานซ่อม</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
