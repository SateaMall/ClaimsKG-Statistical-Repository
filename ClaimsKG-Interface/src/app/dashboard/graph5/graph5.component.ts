import { HttpClient } from '@angular/common/http';
import { Component, AfterViewInit, OnInit } from '@angular/core';
import { DataSet, Network, Node, Edge } from 'vis-network/standalone/esm/vis-network';
import { MatIconModule } from '@angular/material/icon';
interface GraphData {
  nodes: Node[];
  edges: Edge[];
}

@Component({
  selector: 'app-graph5',
  standalone: true,
  templateUrl: './graph5.component.html',
  imports: [MatIconModule],
  styleUrls: ['./graph5.component.css']
})
export class Graph5Component implements OnInit, AfterViewInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.createGraph();
  }

  createGraph(): void {
    this.http.get<GraphData>('http://localhost:5000/graph-data').subscribe(data => {
      const nodes = new DataSet<Node>(data.nodes);
      const edges = new DataSet<Edge>(data.edges);

      const container = document.getElementById('vis-graph') as HTMLElement;
      const graphData = { nodes, edges };
      const options = {
        nodes: {
          font: {
            color: 'black',
            size: 18,
            
          },
          shadow: true,
          scaling: {
            customScalingFunction: function (min: any, max: any, total: number, value: number) {
              return value / total;
            },
            min: 15,
            max: 110,
          },
          
        },
        interaction: {
          zoomView: true,
          dragView: true,
          dragNodes: true,
          zoomSpeed: 0.4,
        }
        
      };
      new Network(container, graphData, options);
    });
  }

}