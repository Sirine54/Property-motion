import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type PropertyItem = {
  id: string | number;
  name: string;
  address: string;
  beds: number;
  baths: number;
  dimension: string;
  marketing: number;
  compliance: number;
  img?: string;
};

type Props = {
  data: PropertyItem[];
};

export default function PropertyTable({ data }: Props) {
  return (
    <Card className="w-full border-none shadow-none">
      <CardContent className="overflow-x-auto border-none">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Property Name</TableHead>
              <TableHead>Address</TableHead>
              <TableHead className="py-4 text-center align-top">No. beds</TableHead>
              <TableHead className="py-4 text-center align-top">No. baths</TableHead>
              <TableHead className="py-4 text-center align-top">Dimension</TableHead>
              <TableHead className="py-4 text-center align-top">Marketing</TableHead>
              <TableHead className="py-4 text-center align-top">Compliance</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="border-none">
            {data.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="flex items-center  gap-3 py-4">
                  <div className="text-sm font-medium">{p.name}</div>
                </TableCell>

                <TableCell className="py-4 text-left align-top">
                  <span>{p.address}</span>
                </TableCell>
                <TableCell className="py-4 text-center align-top">{p.beds}</TableCell>

                <TableCell className="py-4 text-center align-top">
                  <span className=" px-3 py-1 rounded-md text-xs font-semibold">{p.baths}</span>
                </TableCell>
                <TableCell className="py-4 text-center align-top">
                  <span className="px-3 py-1 rounded-md text-xs font-semibold">{p.dimension}</span>
                </TableCell>

                <TableCell className="py-4 text-center align-top">
                  <span className="bg-[#27C49926] block  w-full text-emerald-700 px-3 py-1 rounded-md text-xs font-semibold">
                    {p.marketing}%
                  </span>
                </TableCell>

                <TableCell className="py-4 text-center align-top">
                  <span className="bg-[#27C49926] block  w-full text-emerald-700 px-3 py-1 rounded-md text-xs font-semibold">
                    {p.compliance}%
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
