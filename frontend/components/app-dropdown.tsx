"use client"

import * as React from "react"

import { type DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu"
import axios from "axios"

type Checked = DropdownMenuCheckboxItemProps["checked"]


// CLASSES MULTIPLE SELECTIONS
export function DropdownClasses(props: { setClasses: Function, default?: string[] }) {
  const classes =
    ["1A", "1B", "1C", "1D", "2A", "2B", "2C", "2D", "3A", "3B", "3C", "3D", "4A", "4B", "4C", "4D", "5A", "5B", "5C", "5D"]
  const [checkedClasses, setCheckedClasses] = React.useState<Record<string, Checked>>({})
  props.default?.forEach((item) => {
    checkedClasses[item] = true;
  })
  const [selectedClasses, setSelectedClasses] = React.useState<string[]>(props.default || [])

  React.useEffect(() => {
    props.setClasses((prev: object) => ({
      ...prev,
      classes: selectedClasses
    }))
  }, [selectedClasses])

  const handleCheckedChange = (classes: string, checked: Checked) => {
    setCheckedClasses(prev => ({ ...prev, [classes]: checked }))
    if (checked) {
      setSelectedClasses(prev => [...prev, classes])
    } else {
      setSelectedClasses(prev => prev.filter(s => s !== classes))
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default" className={`w-1/2 bg-white hover:bg-[#f8f8f8] text-black rounded-full border  focus-visible:border-chart-4 focus-visible:ring-chart-4 focus-visible:ring-[1px] data-[state=open]:border-green-500`}>Classes</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Classes</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {classes.map((classes) => (
          <DropdownMenuCheckboxItem
            key={classes}
            checked={checkedClasses[classes] || false}
            onSelect={(e) => { e.preventDefault() }}
            onCheckedChange={(checked) => handleCheckedChange(classes, checked)}
          >
            {classes}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


// CLASS SINGLE SELECTIONS
type DropdownProp = {
  defaultClass?: string,
  setClass: Function
}
export function DropdownClass({ defaultClass, setClass }: DropdownProp) {
  const classes =
    ["1A", "1B", "1C", "1D", "2A", "2B", "2C", "2D", "3A", "3B", "3C", "3D", "4A", "4B", "4C", "4D", "5A", "5B", "5C", "5D"]
  const [selectedClass, setSelectedClass] = React.useState(defaultClass || "")
  function handleChange(value: string) {
    setSelectedClass(value)
    setClass(value)
  }


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default" className={` bg-white hover:bg-[#f8f8f8] text-black rounded-full border  focus-visible:border-chart-4 focus-visible:ring-chart-4 focus-visible:ring-[1px] data-[state=open]:border-green-500`}>
          {selectedClass}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={selectedClass} onValueChange={handleChange}>
          {
            classes.map((item, id) => (
              <DropdownMenuRadioItem key={id} value={item}>{item}</DropdownMenuRadioItem>
            ))
          }
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// SUBJECTS MULTIPLE SELECTIONS
export function DropdownSubjects(props: { setSubjects: Function, default?: string[] }) {
  type Subjects = {
    subject_id: number,
    name: string
  }
  const [subjects, setSubjects] = React.useState<Subjects[]>()
  React.useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/subject`)
      .then((res) => setSubjects(res.data.data))
      .catch((err) => console.log(err.message))
  }, [])

  const [checkedSubjects, setCheckedSubjects] = React.useState<Record<string, Checked>>({})
  props.default?.forEach((item) => {
    checkedSubjects[item] = true
  })

  const [selectedSubjects, setSelectedSubjects] = React.useState<string[]>(props.default || [])

  React.useEffect(() => {
    props.setSubjects((prev: object) => ({ ...prev, subjects: selectedSubjects }));
  }, [selectedSubjects])

  const handleCheckedChange = (subject: string, checked: Checked) => {
    setCheckedSubjects(prev => ({ ...prev, [subject]: checked }))
    if (checked) {
      setSelectedSubjects(prev => [...prev, subject])
    } else {
      setSelectedSubjects(prev => prev.filter(s => s !== subject))
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default" className={`w-1/2 bg-white hover:bg-[#f8f8f8] text-black rounded-full border  focus-visible:border-chart-4 focus-visible:ring-chart-4 focus-visible:ring-[1px] data-[state=open]:border-green-500`}>Subjects</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Subjects</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {
          (subjects) &&
          subjects.map((item) => (
            <DropdownMenuCheckboxItem
              key={item.subject_id}
              checked={checkedSubjects[item.name] || false}
              onSelect={(e) => { e.preventDefault() }}
              onCheckedChange={(checked) => handleCheckedChange(item.name, checked)}
            >
              {item.name}
            </DropdownMenuCheckboxItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// STUDENTS MULTIPLE SELECTIONS
export function DropdownStudents() {
  const students = ["Alice Johnson", "Bob Smith", "Charlie Brown", "Diana Prince", "Ethan Hunt", "Fiona Apple", "George Miller", "Hannah Montana", "Isaac Newton", "Julia Roberts", "Kevin Hart", "Laura Palmer"]
  const [checkedStudents, setCheckedStudents] = React.useState<Record<string, Checked>>({})
  const [selectedStudents, setSelectedStudents] = React.useState<string[]>([])
  console.log(selectedStudents);


  const handleCheckedChange = (students: string, checked: Checked) => {
    setCheckedStudents(prev => ({ ...prev, [students]: checked }))
    if (checked) {
      setSelectedStudents(prev => [...prev, students])
    } else {
      setSelectedStudents(prev => prev.filter(s => s !== students))
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default" className={`bg-white hover:bg-[#f8f8f8] text-black rounded-full border  focus-visible:border-chart-4 focus-visible:ring-chart-4 focus-visible:ring-[1px] data-[state=open]:border-green-500`}>
          Students
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Students</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {students.map((item, id) => (
          <DropdownMenuCheckboxItem
            key={id}
            checked={checkedStudents[item] || false}
            onSelect={(e) => { e.preventDefault() }}
            onCheckedChange={(checked) => handleCheckedChange(item, checked)}
          >
            {item}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}